package com.xhu.headline_server.Controller.user;


import com.xhu.headline_server.entity.Comment;
import com.xhu.headline_server.entity.NewsPort;
import com.xhu.headline_server.entity.NewsPortDTO;

import com.xhu.headline_server.entity.User;
import com.xhu.headline_server.service.CategoryService;
import com.xhu.headline_server.service.CommentService;
import com.xhu.headline_server.service.NewsService;
import com.xhu.headline_server.service.impl.SensitiveServiceImpl;
import com.xhu.headline_server.service.impl.UserServiceImpl;
import com.xhu.headline_server.utils.AliyunOSSOperator;
import com.xhu.headline_server.service.impl.NewPortServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/user")
public class UserPostController {

    @Autowired
    private NewsService newsService;
    @Autowired
    private NewPortServiceImpl newPortServiceImpl;
    @Autowired
    private CategoryService categoryService;
    @Autowired
    private AliyunOSSOperator aliyunOSSOperator;
    @Autowired
    private SensitiveServiceImpl sensitiveServiceImpl;
    @Autowired
    private UserServiceImpl userServiceImpl;
    @Autowired
    private CommentService commentService;


    // 查咨询列表
    // 请求体示例
    // params : { page , size , keyword , categoryId , sort}
    @GetMapping("/news")
    public Map<String, Object> getNewsList(@RequestParam(defaultValue = "1") int page,
                                           @RequestParam(defaultValue = "10") int size,
                                           @RequestParam(required = false) String keyword,
                                           @RequestParam(required = false) Integer categoryId,
                                           @RequestParam(defaultValue = "time") String sort) {
        if (page <= 0 || size <= 0) {
            return Map.of("code", 0, "message", "page/size 必须大于 0");
        }
        if (!"time".equals(sort) && !"hot".equals(sort)) {
            return Map.of("code", 0, "message", "sort 仅支持 time/hot");
        }
        try {
            Map<String, Object> data = newsService.getNewsList(
                    page,
                    size,
                    keyword == null ? "" : keyword.trim(),
                    categoryId,
                    sort
            );
            return Map.of("code", 1, "message", "ok", "data", data);
        } catch (IllegalArgumentException ex) {
            return Map.of("code", 0, "message", ex.getMessage());
        } catch (Exception ex) {
            ex.printStackTrace();
            return Map.of("code", 0, "message", "服务器内部错误");
        }
    }


    // 查咨询详情
    @GetMapping("/news/{id}")
    public Map<String, Object> getNewsDetail(@PathVariable Long id) {
        Map<String, Object> res = new HashMap<>();
        // 说白了还是查
        // 注意这里实现类的细节
        res = newsService.getNewsDetail(id);
        return res;
    }

    // 增加浏览量
    @PostMapping("/news/{id}/view")
    public Map<String, Object> addViewCount(@PathVariable Long id) {
        // 用户访问页面自动触发 说到了还是增
        int viewCount = newsService.addViewCount(id);
        return Map.of("ViewCount", viewCount);
    }

    // 点赞
    // params : { likeCount , linked}
    @PostMapping("/news/{id}/like")
    public Map<String, Object> likeNews(@PathVariable Long id,
                                        @RequestParam(name = "liked", required = true) Boolean liked) {
        if (liked == null) {
            return Map.of("code", 0, "message", "liked 参数缺失");
        }
        if (liked) {
            // 已经点过，再点一次取消
            return newsService.delLikeCount(id);
        } else {
            // 未点过，执行点赞
            return newsService.addLikeCount(id);
        }
    }


    // 查看评论
    // params : {page , size}
    @GetMapping("/news/{id}/comments")
    public Map<String, Object> comments(@PathVariable long id, @RequestParam Map<String, Object> params) {
        Map<String, Object> res = new HashMap<>();
        int page = Integer.parseInt(params.getOrDefault("page", "1").toString());
        int size = Integer.parseInt(params.getOrDefault("size", "5").toString());
        // 传入对应id和想看的帖子id 调用服务层方法具体实现
        res = newsService.getCommentList(id, page, size);
        return res;
    }
    // 发表评论


    // 评论回复
    @PostMapping("/news/{id}/comments")
    public Map<String, Object> addComments(@PathVariable long id, @RequestBody Map<String, Object> body) {
        if (body.get("content") == null) {
            return Map.of("code", 0, "message", "评论内容不能为空");
        }
        String content = body.get("content").toString();

        long parentId = 0;
        Object parentObj = body.get("parentId");
        if (parentObj != null && !"null".equalsIgnoreCase(parentObj.toString())) {
            try { parentId = Long.parseLong(parentObj.toString()); } catch (NumberFormatException ignored) { parentId = 0; }
        }

        if (body.get("userId") == null) {
            return Map.of("code", 0, "message", "用户ID缺失");
        }
        long userId;
        try { userId = Long.parseLong(body.get("userId").toString()); }
        catch (NumberFormatException e) { return Map.of("code", 0, "message", "用户ID格式错误"); }

        try {
            Comment comment = new Comment();
            comment.setPostId(id);
            comment.setUserId(userId);
            comment.setContent(content);
            comment.setParentId(parentId);
            boolean ok = commentService.addComment(comment);
            return Map.of("code", ok ? 1 : 0, "message", ok ? "评论成功" : "评论失败");
        } catch (Exception e) {
            e.printStackTrace();
            return Map.of("code", 0, "message", "服务器内部错误");
        }
    }


    /**
     * 用户端发表帖子
     */
    // java
// 替换 UserPostController 中的 PostPort 方法
    @PostMapping("/news/post")
    public Map<String, Object> PostPort(@RequestBody Map<String, Object> params) {
        try {
            // 1. authorId（必须）
            if (params.get("authorId") == null) {
                return Map.of("code", 0, "message", "authorId 缺失");
            }
            long authorId;
            try { authorId = Long.parseLong(params.get("authorId").toString()); }
            catch (Exception e) { return Map.of("code", 0, "message", "authorId 格式错误"); }

            // 2. title / content 必须
            Object t = params.get("title");
            Object c = params.get("content");
            if (t == null || c == null) {
                return Map.of("code", 0, "message", "title 或 content 缺失");
            }
            String title = t.toString();
            String content = c.toString();

            // 3. categoryId 优先，若为 0 或未传则检查 categoryName
            int categoryId = 0;
            Object catIdObj = params.get("categoryId");
            if (catIdObj != null) {
                try { categoryId = Integer.parseInt(catIdObj.toString()); }
                catch (Exception ignored) { categoryId = 0; }
            }
            if (categoryId <= 0) {
                Object catNameObj = params.get("categoryName");
                if (catNameObj != null) {
                    String catName = catNameObj.toString().trim();
                    if (!catName.isEmpty()) {
                        // 查找或新增分类
                        var cat = categoryService.findByName(catName);
                        if (cat == null) {
                            cat = categoryService.addCategory(catName);
                        }
                        if (cat != null) categoryId = cat.getId();
                    }
                }
            }

            // 4. 其它字段
            String coverImages = params.getOrDefault("coverImages", "").toString();
            int status = 0; // 默认需要审核

            // 5. 构造 DTO 并保存
            NewsPortDTO post = new NewsPortDTO();
            post.setAuthorId(authorId);
            post.setTitle(title);
            post.setContent(content);
            post.setCategoryId(categoryId);
            post.setCoverImages(coverImages);
            post.setStatus(status);

            Long newId = newPortServiceImpl.saveNewsPort(post);
            return Map.of("id", newId);
        } catch (Exception e) {
            e.printStackTrace();
            return Map.of("code", 0, "message", "服务器内部错误");
        }
    }


    // 获取类别
    @GetMapping("/news/category/list")
    public Map<String, Object> getCatagory() {
        return Map.of("code", 1, "message", "ok", "data", categoryService.listCategories());
    }

    // 文件上传
    @PostMapping(value = "/upload", consumes = "multipart/form-data")
    public Map<String, Object> uploadImage(@RequestParam("image") MultipartFile image) {
        // 前端传入一张图片 先判断文件
        Map<String, Object> res = new HashMap<>();
        if (image == null || image.isEmpty()) {
            res.put("code", 0);
            res.put("message", "no file uploaded");
            return res;
        }
        try {
            // 调用阿里云工具类 将上传文件存储到oss服务器并且返回链接 加入数据库
            // 不需要理解阿里云工具类如何使用
            String imageUrl = aliyunOSSOperator.upload(image.getBytes(), image.getOriginalFilename());
            res.put("code", 1);
            res.put("imageUrl", imageUrl);
        } catch (Exception e) {
            res.put("code", 0);
            res.put("message", "图片上传失败");

        }
        return res;
    }

    // 设置页面拿到用户详细信息
    @GetMapping("/info")
    public Map<String, Object> settingGetPhone(@RequestParam Long id) {
        HashMap<String, Object> res = new HashMap<>();
        User user = userServiceImpl.getUserById(id);
        if (user == null) {
            return Map.of("code", 0, "message", "用户不存在");
        }
        res.put("id", user.getId());
        res.put("username", user.getUserName());
        res.put("phone", user.getPhone());
        res.put("avatar", user.getAvatarUrl());
        res.put("nickname", user.getNickName());
        return res;
    }

    // 更新
    @PutMapping("/info")
    public Map<String, Object> settinChange(@RequestBody Map<String, Object> params) {
        HashMap<String, Object> res = new HashMap<>();

        Long id = null;
        if (params.get("id") != null) {
            try {
                id = Long.parseLong(params.get("id").toString());
            } catch (NumberFormatException ignored) {
            }
        }

        User user = (id != null) ? userServiceImpl.getUserById(id) : new User();
        if (user == null) {
            user = new User();
        }

        Object u = params.get("username");
        if (u != null) {
            String username = u.toString();
            if (!username.isBlank()) user.setUserName(username);
        }
        Object p = params.get("phone");
        if (p != null) {
            String phone = p.toString();
            if (!phone.isBlank()) user.setPhone(phone);
        }
        Object n = params.get("nickname");
        if (n != null) {
            String nickname = n.toString();
            if (!nickname.isBlank()) user.setNickName(nickname);
        }
        // 新增头像字段处理
        Object a = params.get("avatar");
        if (a != null) {
            String avatar = a.toString();
            if (!avatar.isBlank()) user.setAvatarUrl(avatar);
        }

        try {
            userServiceImpl.saveUser(user);
            res.put("code", 1);
            res.put("message", "用户信息已更新");
            res.put("userName", user.getUserName());
        } catch (Exception e) {
            res.put("code", 0);
            res.put("message", "用户更新失败");
        }

        return res;
    }


    // 敏感词检查
    // 传入参数为文章正文
    @PostMapping("/news/post/sensitive")
    public Map<String, Object> sensitiveCheck(@RequestBody Map<String, Object> body) {
        String content = body == null ? null : String.valueOf(body.get("content"));
        if (content == null || content.isBlank()) {
            return Map.of("code", 0, "message", "正文不存在");
        }
        List<String> words = sensitiveServiceImpl.getAllWords();
        List<String> hitWords = words.stream()
                .filter(word -> word != null && !word.isBlank() && content.contains(word))
                .toList();
        if (!hitWords.isEmpty()) {
            return Map.of("code", 0, "message", "检测到敏感词", "hits", hitWords);
        } else {
            return Map.of("code", 1, "message", "未检测到敏感词");
        }
    }

    // 用户端添加分类
    @PostMapping("/news/category/add")
    public Map<String, Object> addCategory(@RequestBody Map<String, Object> body) {
        String name = (body.get("name") != null) ? body.get("name").toString().trim() : "";
        if (name.isEmpty()) {
            return Map.of("code", 0, "message", "分类名不能为空");
        }
        try {
            // 检查是否已存在同名分类
            var exists = categoryService.findByName(name);
            if (exists != null) {
                return Map.of("code", 1, "message", "已存在", "id", exists.getId());
            }
            var newCat = categoryService.addCategory(name);
            return Map.of("code", 1, "message", "创建成功", "id", newCat.getId());
        } catch (Exception e) {
            return Map.of("code", 0, "message", "创建失败");
        }
    }

    @DeleteMapping("/news/comment/{id}")
    public Map<String, Object> deleteComment(@PathVariable int id) {
        try {
            boolean ok = commentService.deleteComment(id);
            return Map.of("code", ok ? 1 : 0, "message", ok ? "删除成功" : "删除失败");
        } catch (Exception e) {
            return Map.of("code", 0, "message", "服务器内部错误");
        }
    }



}

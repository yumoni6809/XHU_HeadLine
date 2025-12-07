package com.xhu.headline_server.Controller.user;


import com.xhu.headline_server.entity.NewsPort;
import com.xhu.headline_server.service.CategoryService;
import com.xhu.headline_server.service.NewsService;
import com.xhu.headline_server.service.impl.SensitiveServiceImpl;
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
    public Map<String , Object> getNewsDetail(@PathVariable Long id){
        Map<String , Object> res = new HashMap<>();
        // 说白了还是查
        res = newsService.getNewsDetail(id);
        return res;
    }

    // 增加浏览量
    @PostMapping("/news/{id}/view")
    public Map<String , Object> addViewCount(@PathVariable Long id){
        // 用户访问页面自动触发 说到了还是增
        int viewCount = newsService.addViewCount(id);
        return Map.of("ViewCount" , viewCount);
    }

    // 点赞
    // params : { likeCount , linked}
    @PostMapping("/news/{id}/like")
    public Map<String, Object> likeNews(@PathVariable Long id, boolean liked) {
        // 这里前端传入是否点赞过
        Map<String, Object> res;
        if (liked) {
            // 如果已经点赞再点一下取消点赞
            res = newsService.delLikeCount(id);
        } else {
            // 否则正常点赞
            res = newsService.addLikeCount(id);
        }
        return res;
    }


    // 查看评论
    // params : {page , size}
    @GetMapping("/news/{id}/comments")
    public Map<String , Object> comments(@PathVariable long id, @RequestParam Map<String ,Object> params){
        Map<String , Object> res = new HashMap<>();
        int page = Integer.parseInt(params.getOrDefault("page","1").toString());
        int size = Integer.parseInt(params.getOrDefault("size","5").toString());
        // 传入对应id和想看的帖子id 调用服务层方法具体实现
        res = newsService.getCommentList(id,page,size);
        return res;
    }

    // 评论回复
    // params : {id , parentId , content}
    @PostMapping("news/{id}/comments")
    public Map<String, Object> addComments(@PathVariable long id, @RequestBody Map<String, Object> body) {
        String content = body.get("content").toString();
        long parentId = Long.parseLong(body.getOrDefault("parentId", "0").toString());
        return newsService.addComment(id, content, parentId);
    }


    /**
     * 用户端发表帖子
     */
    @PostMapping("/news/post")
    public Map<String , Object> PostPort(@RequestBody Map<String , Object> params){
        // 从参数中获取属性
        String title = params.get("title").toString();
        String content = params.get("content").toString();
        int categoryId = Integer.parseInt(params.getOrDefault("categoryId","0").toString());
        String coverImages = params.get("coverImages").toString();
        int status = Integer.parseInt(params.getOrDefault("status", "1").toString());

        // 赋值给返回对象
        NewsPort post = new NewsPort();
        post.setTitle(title);
        post.setContent(content);
        post.setCategoryId(categoryId);
        post.setCoverImages(coverImages);
        post.setStatus(status);

        //  复用保存帖子方法
        Long newId = newPortServiceImpl.saveNewsPort(post);

        return Map.of("id", newId);
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

    //敏感词检查
    // 传入参数为文章正文
    @PostMapping("/news/post/sensitive")
    public Map<String ,Object>sensitiveCheck(@RequestBody Map<String, Object> body){
        String content = body == null ? null : String.valueOf(body.get("content"));
        if (content == null || content.isBlank()){
            return Map.of("code",0,"message","正文不存在");
        }
        List<String> words = sensitiveServiceImpl.getAllWords();
        List<String> hitWords = words.stream()
                .filter(word -> word != null && !word.isBlank() && content.contains(word))
                .toList();
        if (!hitWords.isEmpty()){
            return  Map.of("code",0,"message","检测到敏感词","hits",hitWords);
        }else{
            return Map.of("code",1,"message","未检测到敏感词");
        }
    }

}

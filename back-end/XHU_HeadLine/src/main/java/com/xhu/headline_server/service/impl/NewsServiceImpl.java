package com.xhu.headline_server.service.impl;

import com.xhu.headline_server.entity.Comment;
import com.xhu.headline_server.entity.NewsPort;
import com.xhu.headline_server.entity.User;
import com.xhu.headline_server.mapper.CommentMapper;
import com.xhu.headline_server.mapper.NewsPortMapper;
import com.xhu.headline_server.mapper.UserMapper;
import com.xhu.headline_server.service.NewsService;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class NewsServiceImpl implements NewsService {
    private static final String DEFAULT_AUTHORID = "匿名用户" ;
    private final NewsPortMapper newsPortMapper;
    private final CommentMapper commentMapper;
    // 默认头像地址
    private static final String DEFAULT_AVATAR = "http://yumoni.top/upload/Transparent_Akkarin_Transparentized.png";
    private final UserMapper userMapper;

    // 我忘了为什么是手动依赖注入了 但是能跑就先不管了
    public NewsServiceImpl(NewsPortMapper newsPortMapper, CommentMapper commentMapper, UserMapper userMapper) {
        this.newsPortMapper = newsPortMapper;
        this.commentMapper = commentMapper;
        this.userMapper = userMapper;
    }

    /**
     * 获取所有帖子
     * 传入分页 关键词 分类id 排序规则参数
     */
    @Override
    public Map<String, Object> getNewsList(int page,
                                           int size,
                                           String keyword,
                                           Integer categoryId,
                                           String sort) {
        // 确保分页路径无误
        int safePage = Math.max(page, 1);
        int safeSize = size > 0 ? size : 10;
        int offset = (safePage - 1) * safeSize;

        // 关键词
        String kw = keyword == null? "" : keyword.trim();

        // 分页相关数据
        List<NewsPort> list = newsPortMapper.findNews(
                kw,
                categoryId,
                sort,
                safeSize,
                offset
        );

        List<Map<String, Object>> enhanced = new java.util.ArrayList<>();
        // 增强for循环便利 依次获取数据
        for (NewsPort n : list) {
            Map<String, Object> item = new HashMap<>();
            item.put("id", n.getId());
            item.put("authorId", n.getAuthorId());
            item.put("categoryId", n.getCategoryId());
            item.put("title", n.getTitle());
            item.put("content", n.getContent());
            item.put("coverImages", n.getCoverImages());
            item.put("status", n.getStatus());
            item.put("viewCount", n.getViewCount());
            item.put("likeCount", n.getLikeCount());
            item.put("commentCount", n.getCommentCount());
            item.put("createTime", n.getCreateTime());
            item.put("updateTime", n.getUpdateTime());
            item.put("source", n.getSource());
            item.put("deleted", n.getDeleted());
            // 注意: 头像和作者名为额外查询获取的 获取authorId为参数
            item.put("avatar_url", getAvatarUrl(n.getAuthorId()));
            item.put("authorName",getAuthorName(n.getAuthorId()));

            enhanced.add(item);
        }

        // 统计总数
        int total = newsPortMapper.countNews(kw, categoryId);

        Map<String, Object> result = new HashMap<>();
        result.put("list", enhanced);
        result.put("total",total);
        return result;
    }

    // 辅助方法
    // 根据 authorId 返回头像 URL
    private String getAvatarUrl(Long authorId) {
        if (authorId == null) return DEFAULT_AVATAR;
        User user = userMapper.getUserById(authorId);
        return user.getAvatarUrl() ;
    }
    // 根据authorId 返回作者名
    private String getAuthorName(Long authorId){
        if (authorId == null) return DEFAULT_AUTHORID;
        User user = userMapper.getUserById(authorId);
        return user.getUserName();
    }

    // 同样用到上面的辅助方法
    // 额外返回作者头像和名字
    @Override
    public Map<String, Object> getNewsDetail(Long id) {
        Map<String,Object> item = new HashMap<>();
        NewsPort n = newsPortMapper.getById(id);
        // 图省事直接复用的上面代码
        item.put("id", n.getId());
        item.put("authorId", n.getAuthorId());
        item.put("categoryId", n.getCategoryId());
        item.put("title", n.getTitle());
        item.put("content", n.getContent());
        item.put("coverImages", n.getCoverImages());
        item.put("status", n.getStatus());
        item.put("viewCount", n.getViewCount());
        item.put("likeCount", n.getLikeCount());
        item.put("commentCount", n.getCommentCount());
        item.put("createTime", n.getCreateTime());
        item.put("updateTime", n.getUpdateTime());
        item.put("source", n.getSource());
        item.put("deleted", n.getDeleted());
        // 注意: 头像和作者名为额外查询获取的 获取authorId为参数
        item.put("avatar_url", getAvatarUrl(n.getAuthorId()));
        item.put("authorName",getAuthorName(n.getAuthorId()));
        return item;

    }

    /**
     * 几乎都是跳板方法 不详细说明了
     */
    @Override
    public int addViewCount(Long id) {
         newsPortMapper.incrViewCount(id);
        return newsPortMapper.getViewCount(id);
    }

    @Override
    public Map<String, Object> updateLikeCount(Long id, boolean liked) {
        if (id == null) {
            throw new IllegalArgumentException("id不能为空");
        }

        if (liked) {
            newsPortMapper.incrLikeCount(id);
        } else {
            // 防止负数：只有在当前 > 0 时才减
            int current = newsPortMapper.getLikeCount(id);
            if (current > 0) {
                newsPortMapper.decrLikeCount(id);
            }
        }

        int likeCount = newsPortMapper.getLikeCount(id);
        return Map.of("likeCount", likeCount, "liked", liked);
    }


    @Override
    public Map<String, Object> addLikeCount(Long id) {
        newsPortMapper.incrLikeCount(id);
        int likeCount = newsPortMapper.getLikeCount(id);
        return Map.of("likeCount", likeCount, "liked", true);
    }

    @Override
    public Map<String, Object> delLikeCount(Long id) {
        newsPortMapper.decrLikeCount(id);
        int likeCount = newsPortMapper.getLikeCount(id);
        return Map.of("likeCount", likeCount, "liked", false);
    }


    @Override
    public Map<String, Object> getCommentList(long postId, int page, int size) {
        if (page <= 0) page = 1;
        if (size <= 0) size = 5;
        int offset = (page - 1) * size;

        List<Comment> comments = commentMapper.listCommentsByPostId(postId, offset, size);

        Map<String, Object> res = new HashMap<>();
        res.put("code", 1);
        res.put("message", "ok");
        res.put("data", comments);
        return res;
    }



    @Override
    public Map<String, Object> addComment(long postId, long userId, String content, long parentId) {
        // 检查用户是否存在
        User user = userMapper.getUserById(userId);
        if (user == null) {
            // 这里抛出异常，Controller 会捕获并返回错误信息给前端
            throw new IllegalArgumentException("用户不存在 (ID: " + userId + ")");
        }

        // 构建评论对象
        Comment comment = new Comment();
        comment.setPostId(postId);
        comment.setUserId(userId);
        comment.setContent(content == null ? "" : content.trim());
        comment.setParentId(parentId);

        // 设置时间
        comment.setCreateTime(LocalDateTime.now().toString());

        // 插入数据库
        commentMapper.insertComment(comment);

        return Map.of(
                "code", 1, // 加上 code=1，前端通常根据这个判断成功
                "message", "评论成功",
                "data", Map.of(
                        "id", comment.getId(),
                        "postId", comment.getPostId(),
                        "userId", comment.getUserId(),
                        "content", comment.getContent(),
                        "parentId", comment.getParentId(),
                        "createTime", comment.getCreateTime()
                )
        );
    }


}

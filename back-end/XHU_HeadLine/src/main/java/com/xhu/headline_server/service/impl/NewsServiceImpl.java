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
    private final NewsPortMapper newsPortMapper;
    private final CommentMapper commentMapper;
    private static final String DEFAULT_AVATAR = "http://yumoni.top/upload/Transparent_Akkarin_Transparentized.png";
    private final UserMapper userMapper;


    public NewsServiceImpl(NewsPortMapper newsPortMapper, CommentMapper commentMapper, UserMapper userMapper) {
        this.newsPortMapper = newsPortMapper;
        this.commentMapper = commentMapper;
        this.userMapper = userMapper;
    }
    @Override
    public Map<String, Object> getNewsList(int page,
                                           int size,
                                           String keyword,
                                           Integer categoryId,
                                           String sort) {
        int safePage = Math.max(page, 1);
        int safeSize = size > 0 ? size : 10;
        int offset = (safePage - 1) * safeSize;

        List<NewsPort> list = newsPortMapper.findNews(
                keyword == null ? "" : keyword.trim(),
                categoryId,
                sort,
                safeSize,
                offset
        );

        List<Map<String, Object>> enhanced = new java.util.ArrayList<>();
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

            item.put("avatar_url", getAvatarUrl(n.getAuthorId()));

            enhanced.add(item);
        }

        Map<String, Object> result = new HashMap<>();
        result.put("page", safePage);
        result.put("size", safeSize);
        result.put("list", enhanced);
        return result;
    }


    // 根据 authorId 返回头像 URL
    private String getAvatarUrl(Long authorId) {
        if (authorId == null) return DEFAULT_AVATAR;
        User user = userMapper.getUserById(authorId);
        return user.getAvatarUrl() ;
    }


    @Override
    public Map<String, Object> getNewsDetail(Long id) {
        return newsPortMapper.findNewsById(id);
    }

    @Override
    public int addViewCount(Long id) {
         newsPortMapper.incrViewCount(id);
        return newsPortMapper.getViewCount(id);
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
    public Map<String, Object> getCommentList(long id, int page, int size) {
        int offset = (page - 1) * size;
        List<Comment> rows = commentMapper.listCommentsByPostId(id , offset , size);
        int total = commentMapper.countCommentsByPostId(id);

        return Map.of("rows",rows,"total",total,"page",page,"size",size);
    }


    @Override
    public Map<String, Object> addComment(long id, String content, long parentId) {
        Comment comment = new Comment();
        comment.setPostId(id);
        comment.setContent(content);
        comment.setParentId(parentId);
        comment.setCreateTime(String.valueOf(LocalDateTime.now()));
        commentMapper.insertComment(comment);

        return Map.of(
                "id", comment.getPostId(),
                "content", comment.getContent(),
                "parentId", comment.getParentId(),
                "createTime", comment.getCreateTime()
        );
    }


}

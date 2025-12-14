package com.xhu.headline_server.service;

import java.util.Map;

public interface NewsService {
    Map<String, Object> getNewsList(int page, int size, String keyword, Integer categoryId, String sort);

    Map<String, Object> getNewsDetail(Long id);

    int addViewCount(Long id);

    Map<String, Object> updateLikeCount(Long id, boolean liked);

    Map<String, Object> addLikeCount(Long id);

    Map<String, Object> delLikeCount(Long id);

    Map<String, Object> getCommentList(long id, int page, int size);

    Map<String, Object> addComment(long postId, long userId, String content, long parentId);

}

package com.xhu.headline_server.service;

import com.xhu.headline_server.entity.Comment;

import java.util.List;

public interface CommentService {
    boolean deleteComment(int commentId);

    boolean addComment(Comment comment);

    List<Comment> listUserComments(Long userId);

}

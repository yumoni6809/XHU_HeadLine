package com.xhu.headline_server.mapper;

import com.xhu.headline_server.entity.Comment;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface CommentMapper {
    int insertComment(Comment comment);

    int delById(@Param("id") Integer id);

    Long findPostIdByCommentId(@Param("id") Integer id);

    int incCommentCount(@Param("postId") Long postId, @Param("delta") int delta);

    List<Comment> listCommentsByPostId(@Param("postId") long postId,
                                       @Param("offset") int offset,
                                       @Param("size") int size);

    // 修改返回类型，返回用户评论列表
    List<Comment> listUserComments(@Param("userId") Long userId);
}

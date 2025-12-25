package com.xhu.headline_server.mapper;

import com.xhu.headline_server.entity.Comment;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface CommentMapper {
    List<Comment> listCommentsByPostId(@Param("postId") long postId,
                                       @Param("offset") int offset,
                                       @Param("size") int size);

    int insertComment(Comment comment);

}

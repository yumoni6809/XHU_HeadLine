package com.xhu.headline_server.mapper;

import com.xhu.headline_server.entity.NewsPort;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

@Mapper
public interface NewsPortMapper {

    NewsPort getById(@Param("id") Long id);

    List<NewsPort> listAll();

    List<NewsPort> listByAuthorId(@Param("authorId") Long authorId);

    int insert(NewsPort post);

    int update(NewsPort post);

    int deleteById(@Param("id") Long id);


    int incrCommentCount(@Param("id") Long id);

    Integer getViewCount(@Param("id") Long id);

    int incrViewCount(@Param("id") Long id);

    Integer getLikeCount(@Param("id") Long id);

    int incrLikeCount(@Param("id") Long id);

    int decrLikeCount(@Param("id") Long id);


    Map<String, Object> findNewsById(@Param("id") Long id);



    List<NewsPort> findNews(@Param("keyword") String keyword,
                            @Param("categoryId") Integer categoryId,
                            @Param("sort") String sort,
                            @Param("limit") int limit,
                            @Param("offset") int offset);


    int countNews(@Param("keyword") String keyword,
                  @Param("categoryId") Integer categoryId);

}

package com.xhu.headline_server.mapper;

import com.xhu.headline_server.entity.NewsCategory;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface CategoryMapper {
    List<NewsCategory> selectAll();
    NewsCategory getById(@Param("id") Integer id);


    @Select("select * from news_category where name = #{name} limit 1")
    NewsCategory getByName(@Param("name") String name);

    @Insert("insert into news_category(name) values(#{name})")
    @Options(useGeneratedKeys = true, keyProperty = "id", keyColumn = "id")
    int insert(NewsCategory category);
}
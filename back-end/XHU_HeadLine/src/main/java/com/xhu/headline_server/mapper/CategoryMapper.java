package com.xhu.headline_server.mapper;

import com.xhu.headline_server.entity.newsCategory;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface CategoryMapper {
    List<newsCategory> selectAll();
}

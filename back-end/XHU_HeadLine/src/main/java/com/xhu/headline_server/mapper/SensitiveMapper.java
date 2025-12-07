package com.xhu.headline_server.mapper;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;
@Mapper
public interface SensitiveMapper {

    List<String> getAllWords();
}

package com.xhu.headline_server.service.impl;

import com.xhu.headline_server.entity.NewsCategory;
import com.xhu.headline_server.mapper.CategoryMapper;
import com.xhu.headline_server.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryMapper categoryMapper;
    // 太简单我就不说了 完全是个跳板
    @Override
    public List<NewsCategory> listCategories() {
        return categoryMapper.selectAll();
    }
}

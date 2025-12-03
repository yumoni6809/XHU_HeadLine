package com.xhu.headline_server.service.impl;

import com.xhu.headline_server.entity.newsCategory;
import com.xhu.headline_server.mapper.CategoryMapper;
import com.xhu.headline_server.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryMapper categoryMapper;
    @Override
    public List<newsCategory> listCategories() {
        return categoryMapper.selectAll();
    }
}

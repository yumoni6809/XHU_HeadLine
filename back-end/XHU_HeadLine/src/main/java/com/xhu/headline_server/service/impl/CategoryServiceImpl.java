// java
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

    @Override
    public List<NewsCategory> listCategories() {
        return categoryMapper.selectAll();
    }

    @Override
    public NewsCategory findByName(String name) {
        if (name == null || name.trim().isEmpty()) return null;
        return categoryMapper.getByName(name.trim());
    }

    @Override
    public NewsCategory addCategory(String name) {
        if (name == null) return null;
        String trimmed = name.trim();
        if (trimmed.isEmpty()) return null;

        // 先检查是否已存在，避免重复插入（并返回已存在的）
        NewsCategory existing = categoryMapper.getByName(trimmed);
        if (existing != null) return existing;

        NewsCategory cat = new NewsCategory();
        cat.setName(trimmed);
        int rows = categoryMapper.insert(cat);
        if (rows > 0) {
            // mapper 使用 useGeneratedKeys，因此 cat.id 已被填充
            return cat;
        } else {
            return null;
        }
    }
}

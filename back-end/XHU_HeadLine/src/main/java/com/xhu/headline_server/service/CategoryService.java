package com.xhu.headline_server.service;

import com.xhu.headline_server.entity.NewsCategory;
import java.util.List;

public interface CategoryService {
    List<NewsCategory> listCategories();

    // 返回 NewsCategory，找不到时返回 null
    NewsCategory findByName(String name);

    // 新增并返回新增的 NewsCategory（包含生成的 id）
    NewsCategory addCategory(String name);
}

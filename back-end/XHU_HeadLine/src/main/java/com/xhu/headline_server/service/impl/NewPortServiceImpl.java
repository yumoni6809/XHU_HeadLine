package com.xhu.headline_server.service.impl;

import com.xhu.headline_server.entity.NewsCategory;
import com.xhu.headline_server.entity.NewsPort;
import com.xhu.headline_server.entity.User;
import com.xhu.headline_server.entity.NewsPortDTO;
import com.xhu.headline_server.mapper.CategoryMapper;
import com.xhu.headline_server.mapper.NewsPortMapper;
import com.xhu.headline_server.mapper.UserMapper;
import com.xhu.headline_server.service.NewPortService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime; // 记得导入时间类
import java.time.format.DateTimeFormatter;


import java.util.List;

@Service
public class NewPortServiceImpl implements NewPortService {

    @Autowired
    private NewsPortMapper newsPortMapper;
    @Autowired
    private UserMapper userMapper;
    @Autowired
    private CategoryMapper CategoryMapper;

    /**
     * 新增或更新新闻
     */
    @Override
    public Long saveNewsPort(NewsPortDTO dto) {
        if (dto == null) return null;

        // 1. --- 核心：处理分类逻辑 ---
        Integer finalCategoryId = dto.getCategoryId();
        String catName = dto.getCategoryName();

        // 如果传了名字，优先用名字去换 ID
        if (catName != null && !catName.trim().isEmpty()) {
            NewsCategory cat = CategoryMapper.getByName(catName.trim());
            if (cat == null) {
                // 没找到 -> 新增分类
                cat = new NewsCategory();
                cat.setName(catName.trim());
                CategoryMapper.insert(cat); // MyBatis 会回填 ID 到 cat 对象
            }
            finalCategoryId = cat.getId();
        }

        // 2. --- DTO 转 Entity ---
        NewsPort entity = new NewsPort();
        // ID 处理
        entity.setId(dto.getId() != null ? dto.getId() : 0);
        // 基础字段复制
        entity.setTitle(dto.getTitle());
        entity.setContent(dto.getContent());
        entity.setAuthorId(dto.getAuthorId() != null ? dto.getAuthorId() : 0);
        entity.setStatus(dto.getStatus() != null ? dto.getStatus() : 0);
        entity.setCoverImages(dto.getCoverImages());
        // 设置计算好的分类 ID
        entity.setCategoryId(finalCategoryId != null ? finalCategoryId : 0);

        // 3. --- 保存或更新 ---
        String now = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));

        if (entity.getId() == 0) {
            entity.setCreateTime(now);
            entity.setUpdateTime(now);
            // 初始化计数
            entity.setViewCount(0);
            entity.setLikeCount(0);
            entity.setCommentCount(0);
            newsPortMapper.insert(entity);
        } else {
            entity.setUpdateTime(now);
            newsPortMapper.update(entity);
        }

        return entity.getId();
    }
    /**
     * 根据 id 查询新闻
     */
    @Override
    public NewsPortDTO getNewsPortById(Long id) {
        if (id == null) {
            return null;
        }
        NewsPort newsPort = newsPortMapper.getById(id);
        if (newsPort == null) {
            return null;
        }
        // 作者信息
        Long authorId = newsPort.getAuthorId();
        String authorName = null;
        String authorAvatar = null;
        if (authorId != null) {
            User author = userMapper.getUserById(authorId);
            if (author != null) {
                authorName = author.getUserName();
                authorAvatar = author.getAvatarUrl();
            }
        }
        // 分类信息
        String categoryName = null;
        Integer categoryId = newsPort.getCategoryId();
        if (categoryId != null) {
            NewsCategory category = CategoryMapper.getById(categoryId);
            if (category != null) {
                categoryName = category.getName();
            }
        }
        // 组装 DTO（字段按需要补全）
        NewsPortDTO dto = new NewsPortDTO();
        dto.setId(newsPort.getId());
        dto.setAuthorId(authorId);
        dto.setCategoryId(categoryId);
        dto.setTitle(newsPort.getTitle());
        dto.setContent(newsPort.getContent());
        dto.setCoverImages(newsPort.getCoverImages());
        dto.setStatus(newsPort.getStatus());
        dto.setViewCount(newsPort.getViewCount());
        dto.setLikeCount(newsPort.getLikeCount());
        dto.setCommentCount(newsPort.getCommentCount());
        dto.setCreateTime(newsPort.getCreateTime());
        dto.setUpdateTime(newsPort.getUpdateTime());
        dto.setSource(newsPort.getSource());
        dto.setDeleted(newsPort.getDeleted());
        dto.setAuthorName(authorName);
        dto.setAuthorAvatar(authorAvatar);
        dto.setCategoryName(categoryName);
        return dto;
    }

    /**
     * 根据 id 删除新闻
     */
    @Override
    public boolean deleteNewsPortById(Long id) {
        if (id == null) {
            return false;
        }
        int affected = newsPortMapper.deleteById(id);
        return affected > 0;
    }

    /**
     * 查询所有帖子
     */
    @Override
    public List<NewsPort> getAllNewsPorts() {
        return newsPortMapper.listAll();
    }
}

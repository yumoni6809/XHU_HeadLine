package com.xhu.headline_server.service;

import com.xhu.headline_server.entity.newsPort;

import java.util.List;

public interface NewPortService {

    /**
     * 新增或更新新闻
     * \- id 为 null 或 0 时新增
     * \- 否则更新
     */
    void saveNewsPort(newsPort newsPortDTO);

    /**
     * 根据 id 查询新闻
     */
    newsPort getNewsPortById(Long id);

    /**
     * 根据 id 删除新闻
     */
    boolean deleteNewsPortById(Long id);

    /**
     * 获取所有新闻
     */
    List<newsPort> getAllNewsPorts();
}

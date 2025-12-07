package com.xhu.headline_server.service;

import com.xhu.headline_server.entity.NewsPort;

import java.util.List;

public interface NewPortService {

    /**
     * 新增或更新新闻
     * \- id 为 null 或 0 时新增
     * \- 否则更新
     *
     * @return
     */
    Long saveNewsPort(NewsPort newsPortDTO);

    /**
     * 根据 id 查询新闻
     */
    NewsPort getNewsPortById(Long id);

    /**
     * 根据 id 删除新闻
     */
    boolean deleteNewsPortById(Long id);

    /**
     * 获取所有新闻
     */
    List<NewsPort> getAllNewsPorts();
}

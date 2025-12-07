package com.xhu.headline_server.service.impl;

import com.xhu.headline_server.entity.NewsPort;
import com.xhu.headline_server.mapper.NewsPortMapper;
import com.xhu.headline_server.service.NewPortService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NewPortServiceImpl implements NewPortService {

    @Autowired
    private NewsPortMapper newsPortMapper;

    /**
     * 新增或更新新闻
     */
    @Override
    public Long saveNewsPort(NewsPort newsPortDTO) {
        if (newsPortDTO == null) {
            return null;
        }
        Long id = newsPortDTO.getId();
        if (id == null || id == 0) {
            // 如果没有传入id就新增一个帖子
            newsPortMapper.insert(newsPortDTO);
        } else {
            // 如果传入id则对已有的帖子更新
            newsPortMapper.update(newsPortDTO);
        }
        return id;
    }

    /**
     * 根据 id 查询新闻
     */
    @Override
    public NewsPort getNewsPortById(Long id) {
        if (id == null) {
            return null;
        }
        return newsPortMapper.getById(id);
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
        List<NewsPort> ports = newsPortMapper.listAll();
        return ports;
    }
}

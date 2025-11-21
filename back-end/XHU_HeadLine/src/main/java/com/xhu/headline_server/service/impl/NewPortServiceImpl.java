package com.xhu.headline_server.service.impl;

import com.xhu.headline_server.entity.newsPort;
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
    public void saveNewsPort(newsPort newsPortDTO) {
        if (newsPortDTO == null) {
            return;
        }
        Long id = newsPortDTO.getId();
        if (id == null || id == 0) {
            // 新增
            newsPortMapper.insert(newsPortDTO);
        } else {
            // 更新
            newsPortMapper.update(newsPortDTO);
        }
    }

    /**
     * 根据 id 查询新闻
     */
    @Override
    public newsPort getNewsPortById(Long id) {
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

    @Override
    public List<newsPort> getAllNewsPorts() {
        List<newsPort> ports = newsPortMapper.listAll();
        return ports;
    }
}

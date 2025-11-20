package com.xhu.headline_server.service.impl;

import com.xhu.headline_server.entity.newsPort;
import com.xhu.headline_server.mapper.NewsPortMapper;
import com.xhu.headline_server.service.NewPortService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Service implementation for news post operations
 */
@Service
public class NewPortServiceImpl implements NewPortService {

    @Autowired
    private NewsPortMapper newsPortMapper;

    /**
     * Add a new news post
     * Insert operation only - does not update existing records
     */
    @Override
    public void addNewsPort(newsPort newsPort) {
        if (newsPort == null) {
            return;
        }
        newsPortMapper.addNewsPort(newsPort);
    }

    /**
     * Update an existing news post
     * Update operation only - requires a valid ID
     */
    @Override
    public void updateNewsPort(newsPort newsPort) {
        if (newsPort == null) {
            return;
        }
        if (newsPort.getId() == 0) {
            // If ID is 0, this might be a new record, but updateNewsPort should only update
            // Log a warning or throw an exception in production code
            return;
        }
        newsPortMapper.updateNewsPort(newsPort);
    }

    /**
     * Get a news post by ID
     * Returns the actual entity instead of a boolean
     */
    @Override
    public newsPort getNewsPortById(Long id) {
        if (id == null) {
            return null;
        }
        return newsPortMapper.getNewsPortById(id);
    }

    /**
     * Delete a news post by ID (logical deletion)
     */
    @Override
    public boolean deleteNewsPortById(Long id) {
        if (id == null) {
            return false;
        }
        int affected = newsPortMapper.deleteNewsPortById(id);
        return affected > 0;
    }
}


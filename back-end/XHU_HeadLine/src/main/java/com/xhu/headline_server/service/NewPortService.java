package com.xhu.headline_server.service;

import com.xhu.headline_server.entity.newsPort;

/**
 * Service interface for news post operations
 */
public interface NewPortService {

    /**
     * Add a new news post
     * @param newsPort the news post to add
     */
    void addNewsPort(newsPort newsPort);

    /**
     * Update an existing news post
     * @param newsPort the news post to update
     */
    void updateNewsPort(newsPort newsPort);

    /**
     * Get a news post by ID
     * @param id the news post ID
     * @return the news post entity, or null if not found
     */
    newsPort getNewsPortById(Long id);

    /**
     * Delete a news post by ID
     * @param id the news post ID
     * @return true if deleted successfully, false otherwise
     */
    boolean deleteNewsPortById(Long id);
}


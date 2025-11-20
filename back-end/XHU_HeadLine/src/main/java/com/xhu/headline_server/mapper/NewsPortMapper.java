package com.xhu.headline_server.mapper;

import com.xhu.headline_server.entity.newsPort;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

/**
 * NewsPort Mapper interface for CRUD operations on news_post table
 */
@Mapper
public interface NewsPortMapper {

    /**
     * Insert a new news post
     * @param newsPort the news post to insert
     * @return number of affected rows
     */
    int addNewsPort(newsPort newsPort);

    /**
     * Update an existing news post
     * @param newsPort the news post to update
     * @return number of affected rows
     */
    int updateNewsPort(newsPort newsPort);

    /**
     * Get a news post by ID
     * @param id the news post ID
     * @return the news post entity, or null if not found
     */
    newsPort getNewsPortById(@Param("id") Long id);

    /**
     * Delete a news post by ID (logical deletion)
     * @param id the news post ID
     * @return number of affected rows
     */
    int deleteNewsPortById(@Param("id") Long id);
}

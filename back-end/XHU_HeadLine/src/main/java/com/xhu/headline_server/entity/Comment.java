package com.xhu.headline_server.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

// 评论回复类
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Comment {
    private long id; // 评论唯一ID
    private long userId; // 评论用户ID
    private long postId; // 评论的新闻帖子ID
    private String content; // 评论内容
    private long parentId; // 父评论ID（如果是回复评论，则为父评论的ID）
    private int status; // 评论状态（0待审核，1表示已删除，2表示被屏蔽）
    private String createTime; // 评论创建时间
    private Integer likeCount;

    public Integer getLikeCount() {
        return likeCount;
    }

    public void setLikeCount(Integer likeCount) {
        this.likeCount = likeCount;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getUserId() {
        return userId;
    }

    public void setUserId(long userId) {
        this.userId = userId;
    }

    public long getPostId() {
        return postId;
    }

    public void setPostId(long postId) {
        this.postId = postId;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public long getParentId() {
        return parentId;
    }

    public void setParentId(long parentId) {
        this.parentId = parentId;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public String getCreateTime() {
        return createTime;
    }

    public void setCreateTime(String createTime) {
        this.createTime = createTime;
    }
}
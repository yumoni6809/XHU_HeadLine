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

}
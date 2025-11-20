package com.xhu.headline_server.entity;

// 敏感词类

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class sensitiveWord {
    private int id;
    private String word;
}

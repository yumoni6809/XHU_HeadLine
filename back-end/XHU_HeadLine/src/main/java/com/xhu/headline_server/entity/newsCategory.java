package com.xhu.headline_server.entity;

// 新闻类别类

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class newsCategory {
   private long id;
    private String name;

}

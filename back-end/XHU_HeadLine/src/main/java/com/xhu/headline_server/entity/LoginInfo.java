package com.xhu.headline_server.entity;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class LoginInfo {
    private long userId;
    @Setter
    private String userName;
    @Setter
    private String password;
    @Setter
    private String token;
    @Setter
    private int role;
}

package com.xhu.headline_server.entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;

// 用户类
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class User {
    private Long id;
    private String userName;
    private String password;
    private String nickName;
    private String avatarUrl;
    private String phone;
    private int role; // 0表示管理员 1表示员工 2表示普通用户
    private String createTime;
    private String updateTime;
    private String delete;

    public Long getId() {
        return id;
    }
    // dzh

    public void setId(Long id) {
        this.id = id;
    }
    //dzhh

    public String getUserName() {
        return userName;
    }
    //dzhhsdfsfd

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getNickName() {
        return nickName;
    }

    public void setNickName(String nickName) {
        this.nickName = nickName;
    }

    public String getAvatarUrl() {
        return avatarUrl;
    }

    public void setAvatarUrl(String avatarUrl) {
        this.avatarUrl = avatarUrl;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public int getRole() {
        return role;
    }

    public void setRole(int role) {
        this.role = role;
    }

    public String getCreateTime() {
        return createTime;
    }

    public void setCreateTime(String createTime) {
        this.createTime = createTime;
    }

    public String getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(String updateTime) {
        this.updateTime = updateTime;
    }

    public String getDelete() {
        return delete;
    }

    public void setDelete(String delete) {
        this.delete = delete;
    }
}

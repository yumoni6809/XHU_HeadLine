package com.xhu.headline_server.service.impl;

import com.xhu.headline_server.entity.LoginInfo;
import com.xhu.headline_server.entity.User;
import com.xhu.headline_server.mapper.UserMapper;
import com.xhu.headline_server.service.UserService;
import com.xhu.headline_server.utils.JwtUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 用户服务实现类
 */
@Service
@Slf4j
public class UserServiceImpl implements UserService {

    @Autowired
    private UserMapper userMapper;

    /**
     * 根据 id 查询用户
     */
    @Override
    public User getUserById(Long id) {
        if (id == null) {
            return null;
        }
        return userMapper.getUserById(id);
    }

    /**
     * 新增或更新用户
     * 如果 id 为 null 则新增，否则更新
     */
    @Override
    public void saveUser(User user) {
        if (user == null) {
            return;
        }
        if (user.getId() == null) {
            userMapper.addUser(user);
        } else {
            userMapper.updateUser(user);
        }
    }

    /**
     * 根据 id 删除用户
     */
    @Override
    public boolean delUserById(Long id) {
        if (id == null) {
            return false;
        }
        int affected = userMapper.delUserById(id);
        return affected > 0;
    }

    /**
     * 新增
     */
    @Override
    public void addUser(User user) {
        if (user == null) {
            return;
        }
        userMapper.addUser(user);
    }

    @Override
    public List<User> searchUsers(String userName, String phone, int page, int size) {
        return List.of();
    }

    @Override
    public long countUsers(String userName, String phone) {
        return 0;
    }

    @Override
    public List<User> getAllUsers() {
        // 通过 mapper 查询所有用户
        List<User> users = userMapper.getAllUsers();
        // 防止返回 null，统一返回空列表
        return users != null ? users : List.of();
    }

    // Java
    @Override
    public LoginInfo login(String username, String password) {
        // 1. 调用 mapper 查询用户
        User user = userMapper.selectNameAndPassword(username, password);
        if (user == null) {
            // 登录失败：账号或密码错误
            return null;
        }

        int grade = user.getRole();
        if (grade != 0 && grade != 1) {
            // 仅允许管理员和员工登录后台管理系统
            return null;
        }

        // 2. 组装 JWT 负载数据
        Map<String, Object> claims = new HashMap<>();
        claims.put("userId", user.getId());
        claims.put("userName", user.getUserName());
        claims.put("role", user.getRole());

        // 3. 使用 JwtUtils 生成 JWT 令牌
        String token = JwtUtils.generateJwt(claims);

        // 4. 封装 LoginInfo 返回
        LoginInfo loginInfo = new LoginInfo();
        loginInfo.setUserId(user.getId());
        loginInfo.setUserName(user.getUserName());
        loginInfo.setPassword(user.getPassword());
        loginInfo.setRole(user.getRole());
        loginInfo.setToken(token);
        loginInfo.setAvatarUrl(user.getAvatarUrl());
        System.out.println("生成的 token: " + token);

        return loginInfo;
    }

}

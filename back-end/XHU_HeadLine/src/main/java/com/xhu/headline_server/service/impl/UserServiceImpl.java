package com.xhu.headline_server.service.impl;

import com.xhu.headline_server.entity.User;
import com.xhu.headline_server.mapper.UserMapper;
import com.xhu.headline_server.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

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
}

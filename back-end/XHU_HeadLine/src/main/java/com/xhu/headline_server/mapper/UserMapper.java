 package com.xhu.headline_server.mapper;

import com.xhu.headline_server.entity.User;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

 @Mapper
public interface UserMapper {

    /**
     * 根据 id 查询用户
     */
    User getUserById(@Param("id") Long id);

    /**
     * 新增用户
     */
    int addUser(User user);

    /**
     * 更新用户
     */
    int updateUser(User user);

    /**
     * 根据 id 删除用户
     */
    int delUserById(@Param("id") Long id);

    /**
     * 获取所有用户
     */
    List<User> getAllUsers();

    /**
     * 根据用户名和密码查询用户
     */
    User selectNameAndPassword(String username, String password);
 }

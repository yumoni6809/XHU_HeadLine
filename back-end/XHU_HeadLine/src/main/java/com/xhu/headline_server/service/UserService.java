package com.xhu.headline_server.service;

import com.xhu.headline_server.entity.User;
import org.springframework.stereotype.Service;

import java.util.List;

public interface UserService {

    User getUserById(Long id);

    void saveUser(User user) ;

    boolean delUserById(Long id);

    void addUser(User user);

    List<User> searchUsers(String userName, String phone, int page, int size);

    long countUsers(String userName, String phone);
}

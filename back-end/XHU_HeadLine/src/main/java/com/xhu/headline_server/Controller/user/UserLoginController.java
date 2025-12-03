package com.xhu.headline_server.Controller.user;

import com.xhu.headline_server.entity.LoginInfo;
import com.xhu.headline_server.entity.User;
import com.xhu.headline_server.entity.UserDTO;
import com.xhu.headline_server.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/user")
public class UserLoginController {

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody UserDTO userDTO) {
        LoginInfo flag = userService.login(userDTO.getUserName(), userDTO.getPassword());

        Map<String, Object> res = new HashMap<>();
        if (flag == null) {
            res.put("code", 0);
            res.put("message", "用户名或密码错误");
            return res;
        }
        res.put("code", 1);
        res.put("data", flag);
        return res;
    }


    @PostMapping("/register")
    public Map<String, Object> register(@RequestBody UserDTO userDTO) {
        Map<String, Object> res = new HashMap<>();
        if (userDTO == null
                || userDTO.getUserName() == null || userDTO.getUserName().trim().isEmpty()
                || userDTO.getPassword() == null || userDTO.getPassword().trim().isEmpty()) {
            res.put("code", 0);
            res.put("message", "用户名或密码不能为空");
            return res;
        }

        User users = new User();
        users.setUserName(userDTO.getUserName());
        users.setPassword(userDTO.getPassword());
        users.setRole(3);
        users.setPhone(userDTO.getPhone());

        try {
            userService.addUser(users);
            res.put("code", 1);
            res.put("message", "注册成功");
            res.put("data", users);
        } catch (Exception e) {
            res.put("code", 0);
            res.put("message", "注册失败: " + e.getMessage());
        }
        return res;
    }


    



}

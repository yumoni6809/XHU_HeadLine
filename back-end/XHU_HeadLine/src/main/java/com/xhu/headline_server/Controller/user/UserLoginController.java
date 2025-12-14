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

    /**
     *登录
     * @param userDTO
     * @return
     */
    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody UserDTO userDTO) {
        // 后端额外返回了头像和用户名信息
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

    /**
     * 注册
     * @param userDTO
     * @return
     */
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
        // 从前端传参中获取参数
        User users = new User();
        users.setUserName(userDTO.getUserName());
        users.setPassword(userDTO.getPassword());
        users.setRole(3);
        users.setPhone(userDTO.getPhone());
        // 调用服务类方法
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

    @GetMapping("/profile")
    public Map<String ,Object> profile(Long id){
        Map<String ,Object> res = new HashMap<>();
        if (id == null){
            res.put("code","0");
            res.put("message","请登录后查看哦~");
            return res;
        }else{
            User user = userService.getUserById(id);
            res.put("code","1");
            res.put("data",user);
            return res;
        }
    }



}

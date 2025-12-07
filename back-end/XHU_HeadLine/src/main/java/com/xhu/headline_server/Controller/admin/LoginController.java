package com.xhu.headline_server.Controller.admin;

import com.xhu.headline_server.entity.LoginInfo;
import com.xhu.headline_server.entity.UserDTO;
import com.xhu.headline_server.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@RestController
public class LoginController {

    @Autowired
    private UserService userService;

    /**
     *
     * @param userDTO
     * @return
     */
    @PostMapping("/admin/login")
    public Map<String, Object> login(@RequestBody  UserDTO userDTO) {
        log.info("登录请求: {}", userDTO);
        String username = userDTO.getUserName();
        String password = userDTO.getPassword();
        // 简单验证用户名和密码
        LoginInfo flag = userService.login(username, password);

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
}

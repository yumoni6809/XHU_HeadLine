// java
package com.xhu.headline_server.Controller.admin;

import com.xhu.headline_server.entity.User;
import com.xhu.headline_server.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;

/**
 * 用户管理后台接口
 * 接口前缀：/admin/user
 */
@RestController
@RequestMapping("/admin/user")
public class UserController {


    private static final Logger log = LoggerFactory.getLogger(UserController.class);

    @Autowired
    private UserService userService;



    // 增：POST /admin/user/add
    // java
    @PostMapping("/add")
    public Map<String, Object> addUser(@RequestBody User user) {
        Map<String, Object> res = new HashMap<>();
        log.info("===> /admin/user/add, request user = {}", user);
        try {
            userService.addUser(user);
            res.put("code", 1);
            res.put("message", "用户添加成功");
            res.put("userName", user.getUserName());
        } catch (Exception e) {
            log.error("addUser error", e);
            res.put("code", 0);
            res.put("message", "用户添加失败");
        }
        return res;
    }


    // 删：POST /admin/user/delete]
    @PostMapping("/delete")
    public Map<String, Object> deleteUser(@RequestBody Map<String, Object> params) {
        Map<String, Object> res = new HashMap<>();
        Long id = getLongParam(params, "id", null);
        if (id == null) {
            res.put("code", 0);
            res.put("message", "缺少用户 id");
            return res;
        }
        try {
            boolean ok = userService.delUserById(id);
            if (ok) {
                res.put("code", 1);
                res.put("message", "用户删除成功");
            } else {
                res.put("code", 0);
                res.put("message", "用户不存在或删除失败");
            }
        } catch (Exception e) {
            res.put("code", 0);
            res.put("message", "用户删除异常");
        }
        return res;
    }

    // 改：POST /admin/user/update
    @PostMapping("/update")
    public Map<String, Object> updateUser(@RequestBody User user) {
        Map<String, Object> res = new HashMap<>();
        if (user == null || user.getId() == null) {
            res.put("code", 0);
            res.put("message", "缺少用户 id，无法更新");
            return res;
        }
        try {
            userService.saveUser(user);
            res.put("code", 1);
            res.put("message", "用户信息已更新");
            res.put("userName", user.getUserName());
        } catch (Exception e) {
            res.put("code", 0);
            res.put("message", "用户更新失败");
        }
        return res;
    }

    // 查单个：POST /admin/user/get
    // 请求体示例：{"id": 1}
    @PostMapping("/get")
    public Map<String, Object> getUser(@RequestBody Map<String, Object> params) {
        Map<String, Object> res = new HashMap<>();
        Long id = getLongParam(params, "id", null);
        if (id == null) {
            res.put("code", 0);
            res.put("message", "缺少用户 id");
            return res;
        }
        try {
            User user = userService.getUserById(id);
            if (user == null) {
                res.put("code", 0);
                res.put("message", "用户不存在");
            } else {
                res.put("code", 1);
                res.put("message", "用户查询成功");
                res.put("user", user);
            }
        } catch (Exception e) {
            res.put("code", 0);
            res.put("message", "用户查询异常");
        }
        return res;
    }

    // 查列表（搜索+分页）：POST /admin/user/search
    // 前端请求示例：
    // {
    //   "userName": "张三",
    //   "page": 1,
    //   "size": 10
    // }
    @PostMapping("/search")
    public Map<String, Object> searchUsers(@RequestBody Map<String, Object> params) {
        Map<String, Object> res = new HashMap<>();
        try {
            String userName = getStringParam(params, "userName");
            String phone = getStringParam(params, "phone");
            int page = getIntParam(params, "page", 1);
            int size = getIntParam(params, "size", 10);

            List<User> list = userService.searchUsers(userName, phone, page, size);
            long total = userService.countUsers(userName, phone);

            Map<String, Object> data = new HashMap<>();
            data.put("list", list);
            data.put("total", total);
            data.put("page", page);
            data.put("size", size);

            res.put("code", 1);
            res.put("data", data);
        } catch (Exception e) {
            res.put("code", 0);
            res.put("message", "用户搜索失败");
        }
        return res;
    }

    // ===== 工具方法（模仿 BookController 的 getStringParam/getIntParam）=====

    private Long getLongParam(Map<String, Object> params, String key, Long defaultVal) {
        Object v = params == null ? null : params.get(key);
        if (v == null) return defaultVal;
        if (v instanceof Number) return ((Number) v).longValue();
        try {
            return Long.parseLong(v.toString());
        } catch (Exception e) {
            return defaultVal;
        }
    }

    private String getStringParam(Map<String, Object> params, String key) {
        Object v = params == null ? null : params.get(key);
        if (v == null) return "";
        if (v instanceof String) return ((String) v).trim();
        return v.toString().trim();
    }

    private int getIntParam(Map<String, Object> params, String key, int defaultVal) {
        Object v = params == null ? null : params.get(key);
        if (v == null) return defaultVal;
        if (v instanceof Number) return ((Number) v).intValue();
        try {
            return Integer.parseInt(v.toString());
        } catch (Exception e) {
            return defaultVal;
        }
    }
}

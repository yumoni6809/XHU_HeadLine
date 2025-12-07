// java
package com.xhu.headline_server.Controller.admin;

import com.xhu.headline_server.entity.User;
import com.xhu.headline_server.service.UserService;
import com.xhu.headline_server.utils.AliyunOSSOperator;
import com.xhu.headline_server.utils.util1;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;

@RestController
@RequestMapping("/admin/user")
public class UserController {

    private static final Logger log = LoggerFactory.getLogger(UserController.class);

    @Autowired
    private UserService userService;

    @Autowired
    private AliyunOSSOperator aliyunOSSOperator;


    /**
     *
     * 大部分代码逻辑和帖子类一样 就不详细说明了
     *
     */






    // 增：POST /admin/user/add
    @PostMapping("/add")
    public Map<String, Object> addUser(@RequestBody User user) {
        Map<String, Object> res = new HashMap<>();
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

    // 删：POST /admin/user/delete
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
            log.error("deleteUser error", e);
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
            log.error("updateUser error", e);
            res.put("code", 0);
            res.put("message", "用户更新失败");
        }
        return res;
    }

    // 查单个：POST /admin/user/get
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
            log.error("getUser error", e);
            res.put("code", 0);
            res.put("message", "用户查询异常");
        }
        return res;
    }

    // 查列表：POST /admin/user/search
    // 请求体示例：
    // { "userName": "张三", "role": "admin", "phone": "188", "page": 1, "size": 10 }
    @PostMapping("/list")
    public Map<String, Object> searchUsers(@RequestBody Map<String, Object> params) {
        Map<String, Object> res = new HashMap<>();
        try {
            String userName = getStringParam(params, "userName");
            String role = getStringParam(params, "role");
            String phone = getStringParam(params, "phone");
            int page = getIntParam(params, "page", 1);
            int size = getIntParam(params, "size", 10);

            // 先查出所有用户
            List<User> all = userService.getAllUsers();

            // userName 模糊匹配，其它等值匹配
            Map<String, String> contains = new HashMap<>();
            contains.put("userName", userName);

            Map<String, String> equals = new HashMap<>();
            if (!role.isEmpty()) {
                equals.put("role", role);
            }
            if (!phone.isEmpty()) {
                equals.put("phone", phone);
            }

            // 使用 util1 统一做过滤 + 分页
            // 这里不需要弄懂
            Map<String, Object> data = util1.filterAndPage(all, contains, equals, page, size);

            res.put("code", 1);
            res.put("data", data);
        } catch (Exception e) {
            log.error("searchUsers error", e);
            res.put("code", 0);
            res.put("message", "用户搜索失败");
        }
        return res;
    }

    // 上传头像示例：POST /admin/user/uploadImage
    @PostMapping(value = "/uploadImage", consumes = "multipart/form-data")
    public Map<String, Object> uploadImage(@RequestParam("image") MultipartFile image) {
        Map<String, Object> res = new HashMap<>();
        if (image == null || image.isEmpty()) {
            res.put("code", 0);
            res.put("message", "no file uploaded");
            return res;
        }
        try {
            String imageUrl = aliyunOSSOperator.upload(image.getBytes(), image.getOriginalFilename());
            res.put("code", 1);
            res.put("imageUrl", imageUrl);
        } catch (Exception e) {
            log.error("uploadImage error", e);
            res.put("code", 0);
            res.put("message", "图片上传失败");


        }
        return res;
    }

    // ===== 工具方法 =====

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

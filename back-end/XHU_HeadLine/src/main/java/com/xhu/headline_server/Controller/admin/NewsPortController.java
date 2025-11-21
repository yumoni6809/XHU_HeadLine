package com.xhu.headline_server.Controller.admin;

import com.xhu.headline_server.entity.newsPort;
import com.xhu.headline_server.service.NewPortService;
import com.xhu.headline_server.utils.util1;
import org.mybatis.logging.Logger;
import org.mybatis.logging.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/admin/port")
public class NewsPortController {

    @Autowired
    private NewPortService newPortService;

    private static final Logger log = LoggerFactory.getLogger(NewsPortController.class);

    // 增
    @PostMapping("/add")
    public Map<String, Object> addNewsPort(@RequestBody newsPort newsPortDTO) {
        Map<String, Object> res = new HashMap<>();
        try {
            // 使用服务层的 saveNewsPort 完成新增
            newPortService.saveNewsPort(newsPortDTO);
            res.put("code", 1);
            res.put("message", "新闻添加成功");
        } catch (Exception e) {
            res.put("code", 0);
            res.put("message", "新闻添加失败");
        }
        return res;
    }

    // 查
    @PostMapping("/get")
    public Map<String, Object> getNewsPort(@RequestBody Map<String, Object> params) {
        Map<String, Object> res = new HashMap<>();
        try {
            Object idObj = params.get("id");
            if (idObj == null) {
                res.put("code", 0);
                res.put("message", "缺少新闻 id");
                return res;
            }
            Long id = Long.valueOf(idObj.toString());

            newsPort newsPort = newPortService.getNewsPortById(id);
            if (newsPort == null) {
                res.put("code", 0);
                res.put("message", "新闻不存在");
            } else {
                res.put("code", 1);
                res.put("data", newsPort);
            }
        } catch (Exception e) {
            res.put("code", 0);
            res.put("message", "新闻获取失败");
        }
        return res;
    }

    // 查列表
    // 请求体示例
    // params: { pageNum, pageSize, title, authorId, categoryId, status }
    @PostMapping("/list")
    public Map<String, Object> listNewsPorts(@RequestBody Map<String, Object> params) {
        Map<String, Object> res = new HashMap<>();

        String title = params.get("title") != null ? params.get("title").toString() : null;
        String authorId = params.get("authorId") != null ? params.get("authorId").toString() : null;
        String categoryId = params.get("categoryId") != null ? params.get("categoryId").toString() : null;
        String status = params.get("status") != null ? params.get("status").toString() : null;

        int page = params.get("pageNum") != null
                ? Integer.parseInt(params.get("pageNum").toString())
                : 1;
        int size = params.get("pageSize") != null
                ? Integer.parseInt(params.get("pageSize").toString())
                : 10;

        List<newsPort> allNews = newPortService.getAllNewsPorts();

        Map<String, String> contains = new HashMap<>();
        contains.put("title", title);

        Map<String, String> equals = new HashMap<>();
        if (authorId != null && !authorId.isEmpty()) {
            equals.put("authorId", authorId);
        }
        if (categoryId != null && !categoryId.isEmpty()) {
            equals.put("categoryId", categoryId);
        }
        if (status != null && !status.isEmpty()) {
            equals.put("status", status);
        }

        Map<String, Object> data = util1.filterAndPage(allNews, contains, equals, page, size);
        res.put("code", 1);
        res.put("data", data);

        return res;
    }


    // 改
    @PostMapping("/update")
    public Map<String, Object> updateNewsPort(@RequestBody newsPort newsPortDTO) {
        Map<String, Object> res = new HashMap<>();
        if (newsPortDTO.getId() == 0 || newsPortDTO.getId() == 0) {
            res.put("code", 0);
            res.put("message", "新闻 id 不能为空");
            return res;
        }

        try {
            // 仍然复用 saveNewsPort，带 id 即更新
            newPortService.saveNewsPort(newsPortDTO);
            res.put("code", 1);
            res.put("message", "新闻更新成功");
        } catch (Exception e) {
            res.put("code", 0);
            res.put("message", "新闻更新失败");
        }
        return res;
    }

    // 删
    @PostMapping("/delete")
    public Map<String, Object> deleteNewsPort(@RequestBody Map<String, Object> params) {
        Map<String, Object> res = new HashMap<>();
        try {
            Object idObj = params.get("id");
            if (idObj == null) {
                res.put("code", 0);
                res.put("message", "缺少新闻 id");
                return res;
            }
            Long id = Long.valueOf(idObj.toString());

            boolean success = newPortService.deleteNewsPortById(id);
            if (success) {
                res.put("code", 1);
                res.put("message", "新闻删除成功");
            } else {
                res.put("code", 0);
                res.put("message", "新闻删除失败，记录可能不存在");
            }
        } catch (Exception e) {
            res.put("code", 0);
            res.put("message", "新闻删除异常");
        }
        return res;
    }
}

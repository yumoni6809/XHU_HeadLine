package com.xhu.headline_server.Controller.admin;

import com.xhu.headline_server.entity.newsPort;
import com.xhu.headline_server.service.NewPortService;
import org.mybatis.logging.Logger;
import org.mybatis.logging.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/admin/newsport")
public class NewsPortController {

//    @Autowired
//    private NewPortService newPortService;
//
//    private static final Logger log = LoggerFactory.getLogger(NewsPortController.class);
//
//    // 增
//    @PostMapping("/add")
//    public Map<String, Object> addNewsPort(@RequestBody newsPort newsPortDTO) {
//        Map<String, Object> res = new HashMap<>();
//        try {
//            newPortService.addNewsPort();
//            res.put("code", 1);
//            res.put("message", "新闻添加成功");
//        } catch (Exception e) {
//            res.put("code", 0);
//            res.put("message", "新闻添加失败");
//        }
//        return res;
//    }
//    // 查
//    @PostMapping("/get")
//    public Map<String, Object> getNewsPort(@RequestBody Map<String, Object> params) {
//        Map<String, Object> res = new HashMap<>();
//        try {
//            newsPort newsPort = newPortService.getNewsPortById();
//            res.put("code", 1);
//            res.put("data", newsPort);
//        } catch (Exception e) {
//            res.put("code", 0);
//            res.put("message", "新闻获取失败");
//        }
//        return res;
//    }
//
//    // 改
//    @PostMapping("/update")
//    public Map<String, Object> updateNewsPort(@RequestBody newsPort newsPortDTO) {
//        Map<String, Object> res = new HashMap<>();
//        if(newsPortDTO.getId() == Null) {
//            res.put("code", 0);
//            res.put("message", "新闻 id 不能为空");
//            return res;
//        }
//
//        try {
//            newPortService.updateNewsPort();
//            res.put("code", 1);
//            res.put("message", "新闻更新成功");
//        } catch (Exception e) {
//            res.put("code", 0);
//            res.put("message", "新闻更新失败");
//        }
//        return res;
//    }


}

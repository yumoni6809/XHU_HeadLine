package com.xhu.headline_server.Controller.admin;

import com.xhu.headline_server.entity.NewsImportDTO;
import com.xhu.headline_server.entity.NewsPort;
import com.xhu.headline_server.mapper.NewsPortMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@RestController
@RequestMapping("/admin/news")
public class NewsImportController {

    @Autowired
    private NewsPortMapper newsPortMapper;


    // 接入爬虫增量导入新闻数据
    // 不用看懂这个方法
    @PostMapping("/import")
    public Map<String, Object> importNews(@RequestBody List<NewsImportDTO> list) {
        Map<String, Object> res = new HashMap<>();
        if (list == null || list.isEmpty()) {
            res.put("code", 0);
            res.put("message", "empty payload");
            return res;
        }
        int success = 0;
        DateTimeFormatter fmt = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        for (NewsImportDTO dto : list) {
            try {
                NewsPort np = new NewsPort();
                // id
                if (dto.getId() != null) np.setId(dto.getId());
                // 映射字段
                np.setAuthorId(dto.getUserId() == null ? 1L : dto.getUserId());
                np.setCategoryId(dto.getCategoryId() == null ? 1 : dto.getCategoryId());
                np.setTitle(dto.getTitle() == null ? "" : dto.getTitle());
                np.setContent(dto.getContent() == null ? "" : dto.getContent());
                np.setCoverImages(dto.getImagesJson() == null ? "[]" : dto.getImagesJson());
                np.setStatus(dto.getStatus() == null ? 2 : dto.getStatus());
                np.setViewCount(dto.getViewCount() == null ? 0 : dto.getViewCount());
                np.setLikeCount(dto.getLikeCount() == null ? 0 : dto.getLikeCount());
                np.setCommentCount(dto.getCommentCount() == null ? 0 : dto.getCommentCount());
                np.setSource(dto.getTag() == null ? "" : dto.getTag());

                // createTime/updateTime 实体为 String，写入格式化时间字符串
                String createTime = dto.getCreateTime() != null && !dto.getCreateTime().isEmpty()
                        ? dto.getCreateTime()
                        : LocalDateTime.now().format(fmt);
                String updateTime = dto.getUpdateTime() != null && !dto.getUpdateTime().isEmpty()
                        ? dto.getUpdateTime()
                        : LocalDateTime.now().format(fmt);
                np.setCreateTime(createTime);
                np.setUpdateTime(updateTime);

                np.setDeleted(dto.getDeleted() == null ? 0 : dto.getDeleted());

                // 调用 mapper 插入
                newsPortMapper.insert(np);
                success++;
            } catch (Exception e) {
                // 记录单条失败，继续后续
                e.printStackTrace();
            }
        }
        res.put("code", 1);
        res.put("inserted", success);
        res.put("total", list.size());
        return res;
    }
}

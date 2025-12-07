package com.xhu.headline_server.service.impl;

import com.xhu.headline_server.mapper.SensitiveMapper;
import com.xhu.headline_server.service.SensitiveService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SensitiveServiceImpl implements SensitiveService {

    @Autowired
    private SensitiveMapper sensitiveMapper;
    @Override
    public List<String> getAllWords() {
        List<String> words = sensitiveMapper.getAllWords();
        return words;
    }
}

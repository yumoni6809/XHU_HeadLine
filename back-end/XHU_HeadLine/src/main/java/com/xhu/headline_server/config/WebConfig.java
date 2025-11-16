package com.xhu.headline_server.config;

import com.xhu.headline_server.Interceptor.TokenInterceptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Autowired
    private TokenInterceptor tokenInterceptor;

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(tokenInterceptor)
                .addPathPatterns("/**")           // 拦截所有
                .excludePathPatterns(
                        "/admin/login",          // 登录接口放行
                        "/",                     // 首页
                        "/index.html",           // 前端入口
                        "/static/**",            // 静态资源
                        "/assets/**",            // Vite \`/assets\` 等
                        "/favicon.ico"
                );
    }
}

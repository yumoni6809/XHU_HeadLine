package com.xhu.headline_server.Interceptor;


import com.xhu.headline_server.utils.JwtUtils;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.servlet.HandlerInterceptor;

@Slf4j
@Component
public class TokenInterceptor implements HandlerInterceptor {

    @Override
    public boolean preHandle(HttpServletRequest request,
                             HttpServletResponse response,
                             Object handler) throws Exception {

        // 1. 获取请求 url
        String url = request.getRequestURL().toString();

        // 2. 登录接口直接放行
        if (url.contains("/admin/login")) {
            log.info("登录请求，直接放行: {}", url);
            return true;
        }

        // 3. 从请求头获取 token
        String jwt = request.getHeader("token");

        // 4. 判断 token 是否为空
        if (!StringUtils.hasLength(jwt)) {
            log.info("请求未携带 token，拒绝访问");
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return false;
        }

        // 5. 解析 token
        try {
            JwtUtils.parseJWT(jwt);
        } catch (Exception e) {
            log.info("token 解析失败，拒绝访问", e);
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return false;
        }

        // 6. 放行
        return true;
    }
}

// java
// File: `src/main/java/com/xhu/headline_server/Interceptor/TokenInterceptor.java`
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

        // 记录请求便于排查
        log.info("incoming: method={} uri={} remote={} token-header={}",
                request.getMethod(), request.getRequestURI(), request.getRemoteAddr(), request.getHeader("token"));

        // 放行预检请求
        if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
            response.setStatus(HttpServletResponse.SC_OK);
            return true;
        }

        String uri = request.getRequestURI(); // 使用 URI 便于匹配 /api 前缀或无前缀情况

        // 放行公开接口（兼容可能包含 /api 前缀）
        if (uri.contains("/admin/login") || uri.contains("/user/login") || uri.contains("/user/register") || uri.contains("/news")) {
            return true;
        }

        String jwt = request.getHeader("token");
        if (!StringUtils.hasLength(jwt)) {
            log.info("请求未携带 token，拒绝访问 uri={}", uri);
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return false;
        }

        try {
            JwtUtils.parseJWT(jwt);
        } catch (Exception e) {
            log.info("token 解析失败，拒绝访问 uri={}", uri, e);
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return false;
        }

        return true;
    }
}

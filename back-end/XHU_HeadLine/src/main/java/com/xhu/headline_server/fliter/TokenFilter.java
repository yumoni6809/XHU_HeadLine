package com.xhu.headline_server.fliter;

import com.xhu.headline_server.utils.JwtUtils;
import jakarta.servlet.*;
import jakarta.servlet.annotation.WebFilter;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.apache.http.HttpStatus;
import org.springframework.util.StringUtils;

import java.io.IOException;

/**
 * 令牌校验过滤器，只拦截后台接口
 */
@Slf4j
@WebFilter(urlPatterns = "/admin/*") // 只拦截 /admin/** 请求
public class TokenFilter implements Filter {

    @Override
    public void doFilter(ServletRequest req,
                         ServletResponse resp,
                         FilterChain chain) throws IOException, ServletException {

        HttpServletRequest request = (HttpServletRequest) req;
        HttpServletResponse response = (HttpServletResponse) resp;

        String uri = request.getRequestURI();

        // 登录接口直接放行，不做 token 校验也不打印
        if ("/admin/login".equals(uri)) {
            chain.doFilter(request, response);
            return;
        }

        // 只对 /admin/** 其余接口一次性做 token 校验
        String jwt = request.getHeader("token");
        if (!StringUtils.hasLength(jwt)) {
            log.info("后台接口未携带 token, 拒绝访问, uri={}", uri);
            response.setStatus(HttpStatus.SC_UNAUTHORIZED);
            return;
        }

        try {
            JwtUtils.parseJWT(jwt);
        } catch (Exception e) {
            log.info("token 解析失败, 拒绝访问, uri={}", uri);
            response.setStatus(HttpStatus.SC_UNAUTHORIZED);
            return;
        }

        chain.doFilter(request, response);
    }
}

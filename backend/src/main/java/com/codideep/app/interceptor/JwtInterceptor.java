package com.codideep.app.interceptor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import com.codideep.app.settings.JwtUtil;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtInterceptor implements HandlerInterceptor{
    @Autowired
    private JwtUtil jwtUtil;
   
    private static final String BEARER_PREFIX = "Bearer ";

    @Override
    public boolean preHandle(HttpServletRequest request,
            HttpServletResponse response,
            Object handler)
            throws Exception {
                // Permitir solicitudes OPTIONS sin autenticación
                if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
                    return true;
                }
        // Permitir siempre la solicitud a /user/login
        if (request.getRequestURI().equals("/user/login")) {
            return true;
        }
        boolean success = true;

        String authorizationHeader = request.getHeader("Authorization");
        if (authorizationHeader != null && authorizationHeader.startsWith(BEARER_PREFIX)) {
            String token = authorizationHeader.substring(BEARER_PREFIX.length());
            System.out.println("Bearer Token: " + token);
            System.out.println("Token valido");
            success = jwtUtil.validateToken(token);
        } else {
            success = false;
        }
        
        if (success==false) {
            System.out.println("Token invalido");
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        }
        return success;
    }
}

package com.aloha.form.security.handler;

import java.io.IOException;

import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class LoginSuccessHandler implements AuthenticationSuccessHandler {

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws IOException, ServletException {
      log.info("로그인 성공: {}", authentication.getName());

      // redirect 파라미터 있으면, 해당 페이지로 이동
      String redirect = request.getParameter("redirect");
      if( redirect != null && !redirect.isEmpty() ) {
        response.sendRedirect(redirect);
        return;
      }

      log.info("로그인 성공!");

      // 아이디 저장
      String rememberId = request.getParameter("remember-id");    // ✅ 아이디 저장 여부
      String username = request.getParameter("username");         // 👩‍💼 아이디

      // 아이디 저장 체크 ✅ 
      if( rememberId != null && rememberId.equals("on") ) {
          Cookie cookie = new Cookie("remember-id", username);     // 쿠키에 아이디 등록
          cookie.setMaxAge(60 * 60 * 24 * 7);                           // 유효기간 : 7일
          cookie.setPath("/");
          response.addCookie(cookie);
      }
      // 아이디 저장 체크 ❌ 
      else {
          Cookie cookie = new Cookie("remember-id", username);     // 쿠키에 아이디 등록
          cookie.setMaxAge(0);                                   // 유효기간 : 0 (만료)
          cookie.setPath("/");
          response.addCookie(cookie);
      }

      // 관리자 권한 있으면
      if( authentication.getAuthorities().stream()
          .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN")) ) {
        String targetUrl = "/admin";
        response.sendRedirect(targetUrl);
        return;
      }
      
      String targetUrl = "/";
      response.sendRedirect(targetUrl);
    }
  
}

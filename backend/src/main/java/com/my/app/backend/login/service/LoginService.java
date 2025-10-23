package com.my.app.backend.login.service;

import com.my.app.backend.login.dto.LoginRequest;
import com.my.app.backend.login.dto.LoginResponse;
import com.my.app.backend.user.User;
import com.my.app.backend.user.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class LoginService {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Autowired
    private AuthenticationManager authenticationManager;
    
    public LoginResponse login(LoginRequest request, HttpServletRequest httpRequest) {
        LoginResponse response = new LoginResponse();
        
        try {
            // Spring Security 인증 수행
            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                    request.getEmail(),
                    request.getPassword()
                )
            );
            
            // SecurityContext에 인증 정보 저장
            SecurityContextHolder.getContext().setAuthentication(authentication);
            
            // HttpSession에 인증 정보 저장 (세션 생성)
            HttpSession session = httpRequest.getSession(true);
            session.setAttribute("SPRING_SECURITY_CONTEXT", SecurityContextHolder.getContext());
            
            // 사용자 정보 조회
            User user = userRepository.findByEmail(request.getEmail()).orElse(null);
            
            if (user == null) {
                response.setSuccess(false);
                response.setMessage("사용자 정보를 찾을 수 없습니다.");
                return response;
            }
            
            // 로그인 성공
            response.setSuccess(true);
            response.setMessage("로그인 성공");
            response.setName(user.getName());
            response.setEmail(user.getEmail());
            
        } catch (Exception e) {
            response.setSuccess(false);
            response.setMessage("이메일 또는 비밀번호가 올바르지 않습니다.");
        }
        
        return response;
    }
}

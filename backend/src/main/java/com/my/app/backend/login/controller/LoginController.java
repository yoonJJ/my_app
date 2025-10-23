package com.my.app.backend.login.controller;

import com.my.app.backend.login.dto.LoginRequest;
import com.my.app.backend.login.dto.LoginResponse;
import com.my.app.backend.login.dto.SessionResponse;
import com.my.app.backend.login.service.LoginService;
import com.my.app.backend.user.User;
import com.my.app.backend.user.UserRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@Tag(name = "로그인", description = "사용자 로그인 관련 API")
public class LoginController {
    
    @Autowired
    private LoginService loginService;
    
    @Autowired
    private UserRepository userRepository;
    
    @Operation(summary = "사용자 로그인", description = "이메일과 비밀번호로 사용자 로그인을 수행합니다.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "로그인 성공"),
        @ApiResponse(responseCode = "400", description = "잘못된 요청"),
        @ApiResponse(responseCode = "401", description = "인증 실패")
    })
    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request, HttpServletRequest httpRequest) {
        return loginService.login(request, httpRequest);
    }
    
    @Operation(summary = "세션 확인", description = "현재 로그인된 사용자의 세션 정보를 확인합니다.")
    @GetMapping("/session")
    public SessionResponse getSession() {
        SessionResponse response = new SessionResponse();
        
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        
        if (authentication != null && authentication.isAuthenticated() && 
            !authentication.getName().equals("anonymousUser")) {
            response.setAuthenticated(true);
            response.setUsername(authentication.getName());
            
            // 사용자 정보 조회
            Optional<User> user = userRepository.findByEmail(authentication.getName());
            if (user.isPresent()) {
                response.setName(user.get().getName());
                response.setEmail(user.get().getEmail());
            }
        } else {
            response.setAuthenticated(false);
        }
        
        return response;
    }
    
    @Operation(summary = "로그아웃", description = "현재 사용자를 로그아웃합니다.")
    @PostMapping("/logout")
    public String logout() {
        SecurityContextHolder.clearContext();
        return "로그아웃 성공";
    }
}

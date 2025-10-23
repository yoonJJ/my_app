package com.my.app.backend.signup.service;

import com.my.app.backend.signup.dto.SignupRequest;
import com.my.app.backend.signup.dto.SignupResponse;
import com.my.app.backend.user.User;
import com.my.app.backend.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class SignupService {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    public SignupResponse signup(SignupRequest request) {
        SignupResponse response = new SignupResponse();
        
        // 이메일 중복 체크
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            response.setSuccess(false);
            response.setMessage("이미 사용 중인 이메일입니다.");
            return response;
        }
        
        // 핸드폰 번호 중복 체크
        if (request.getPhoneNumber() != null && 
            !request.getPhoneNumber().isEmpty() &&
            userRepository.findByPhoneNumber(request.getPhoneNumber()).isPresent()) {
            response.setSuccess(false);
            response.setMessage("이미 사용 중인 핸드폰 번호입니다.");
            return response;
        }
        
        // 새 사용자 생성
        User newUser = new User();
        newUser.setName(request.getName());
        newUser.setEmail(request.getEmail());
        newUser.setPhoneNumber(request.getPhoneNumber());
        newUser.setPasswordHash(passwordEncoder.encode(request.getPassword()));
        newUser.setPhoneVerified(false);
        newUser.setCreatedAt(java.time.LocalDateTime.now());
        
        userRepository.save(newUser);
        
        // 성공 응답
        response.setSuccess(true);
        response.setMessage("회원가입이 완료되었습니다.");
        response.setName(newUser.getName());
        response.setEmail(newUser.getEmail());
        
        return response;
    }
}


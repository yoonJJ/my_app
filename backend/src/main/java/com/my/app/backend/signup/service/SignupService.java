package com.my.app.backend.signup.service;

import com.my.app.backend.signup.dto.*;
import com.my.app.backend.user.PhoneVerification;
import com.my.app.backend.user.PhoneVerificationRepository;
import com.my.app.backend.user.User;
import com.my.app.backend.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Random;

@Service
public class SignupService {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Autowired
    private PhoneVerificationRepository phoneVerificationRepository;
    
    public PhoneVerificationResponse sendVerificationCode(PhoneVerificationRequest request) {
        PhoneVerificationResponse response = new PhoneVerificationResponse();
        
        // 핸드폰 번호 중복 체크
        if (userRepository.findByPhoneNumber(request.getPhoneNumber()).isPresent()) {
            response.setSuccess(false);
            response.setMessage("이미 사용 중인 핸드폰 번호입니다.");
            return response;
        }
        
        // 6자리 인증번호 생성
        String code = String.format("%06d", new Random().nextInt(1000000));
        
        // DB에 저장
        PhoneVerification verification = new PhoneVerification();
        verification.setPhoneNumber(request.getPhoneNumber());
        verification.setCode(code);
        verification.setVerified(false);
        verification.setExpiresAt(LocalDateTime.now().plusMinutes(3)); // 3분 후 만료
        phoneVerificationRepository.save(verification);
        
        // 개발용: 콘솔 출력용 코드 반환
        response.setSuccess(true);
        response.setMessage("인증번호가 전송되었습니다.");
        response.setVerificationCode(code);
        
        return response;
    }
    
    public VerifyCodeResponse verifyCode(VerifyCodeRequest request) {
        VerifyCodeResponse response = new VerifyCodeResponse();
        
        // 인증번호 조회
        PhoneVerification verification = phoneVerificationRepository
            .findByPhoneNumberAndCode(request.getPhoneNumber(), request.getCode())
            .orElse(null);
        
        if (verification == null) {
            response.setSuccess(false);
            response.setMessage("인증번호가 올바르지 않습니다.");
            return response;
        }
        
        // 만료 시간 체크
        if (verification.getExpiresAt().isBefore(LocalDateTime.now())) {
            response.setSuccess(false);
            response.setMessage("인증번호가 만료되었습니다.");
            return response;
        }
        
        // 이미 인증된 경우
        if (verification.getVerified()) {
            response.setSuccess(false);
            response.setMessage("이미 인증된 번호입니다.");
            return response;
        }
        
        // 인증 완료 처리
        verification.setVerified(true);
        phoneVerificationRepository.save(verification);
        
        response.setSuccess(true);
        response.setMessage("인증이 완료되었습니다.");
        
        return response;
    }
    
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
        
        // 핸드폰 번호 인증 확인
        if (request.getPhoneNumber() != null && !request.getPhoneNumber().isEmpty()) {
            // 해당 핸드폰 번호의 인증된 이력이 있는지 확인
            boolean isVerified = phoneVerificationRepository.findAll()
                .stream()
                .anyMatch(v -> v.getPhoneNumber().equals(request.getPhoneNumber()) && v.getVerified());
            
            if (!isVerified) {
                response.setSuccess(false);
                response.setMessage("핸드폰 번호 인증이 필요합니다.");
                return response;
            }
        }
        
        // 새 사용자 생성
        User newUser = new User();
        newUser.setName(request.getName());
        newUser.setEmail(request.getEmail());
        newUser.setPhoneNumber(request.getPhoneNumber());
        newUser.setPasswordHash(passwordEncoder.encode(request.getPassword()));
        newUser.setPhoneVerified(false);
        newUser.setCreatedAt(java.time.LocalDateTime.now());
        
        // 8자리 랜덤 초대 코드 생성
        String chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        StringBuilder code = new StringBuilder();
        Random random = new Random();
        for (int i = 0; i < 8; i++) {
            code.append(chars.charAt(random.nextInt(chars.length())));
        }
        newUser.setInviteCode(code.toString());
        
        userRepository.save(newUser);
        
        // 성공 응답
        response.setSuccess(true);
        response.setMessage("회원가입이 완료되었습니다.");
        response.setName(newUser.getName());
        response.setEmail(newUser.getEmail());
        
        return response;
    }
    
    public CheckEmailResponse checkEmail(String email) {
        CheckEmailResponse response = new CheckEmailResponse();
        
        if (userRepository.findByEmail(email).isPresent()) {
            response.setAvailable(false);
            response.setMessage("이미 사용 중인 이메일입니다.");
        } else {
            response.setAvailable(true);
            response.setMessage("사용 가능한 이메일입니다.");
        }
        
        return response;
    }
}


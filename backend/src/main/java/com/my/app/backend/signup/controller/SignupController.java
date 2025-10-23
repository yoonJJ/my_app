package com.my.app.backend.signup.controller;

import com.my.app.backend.signup.dto.*;
import com.my.app.backend.signup.service.SignupService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@Tag(name = "회원가입", description = "사용자 회원가입 관련 API")
public class SignupController {
    
    @Autowired
    private SignupService signupService;
    
    @Operation(summary = "이메일 중복 확인", description = "이메일이 사용 가능한지 확인합니다.")
    @GetMapping("/email/check")
    public CheckEmailResponse checkEmail(@RequestParam String email) {
        return signupService.checkEmail(email);
    }
    
    @Operation(summary = "핸드폰 인증번호 전송", description = "핸드폰 번호로 인증번호를 전송합니다.")
    @PostMapping("/phone/send-code")
    public PhoneVerificationResponse sendVerificationCode(@RequestBody PhoneVerificationRequest request) {
        return signupService.sendVerificationCode(request);
    }
    
    @Operation(summary = "핸드폰 인증번호 확인", description = "입력한 인증번호를 검증합니다.")
    @PostMapping("/phone/verify-code")
    public VerifyCodeResponse verifyCode(@RequestBody VerifyCodeRequest request) {
        return signupService.verifyCode(request);
    }
    
    @Operation(summary = "사용자 회원가입", description = "새로운 사용자를 등록합니다.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "회원가입 성공"),
        @ApiResponse(responseCode = "400", description = "잘못된 요청"),
        @ApiResponse(responseCode = "409", description = "중복된 이메일 또는 핸드폰 번호")
    })
    @PostMapping("/signup")
    public SignupResponse signup(@RequestBody SignupRequest request) {
        return signupService.signup(request);
    }
}


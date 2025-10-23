package com.my.app.backend.signup.dto;

import lombok.Data;

@Data
public class PhoneVerificationResponse {
    private boolean success;
    private String message;
    private String verificationCode; // 개발용: 콘솔 출력용
}



package com.my.app.backend.signup.dto;

import lombok.Data;

@Data
public class VerifyCodeRequest {
    private String phoneNumber;
    private String code;
}



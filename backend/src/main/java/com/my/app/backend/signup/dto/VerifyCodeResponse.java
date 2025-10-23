package com.my.app.backend.signup.dto;

import lombok.Data;

@Data
public class VerifyCodeResponse {
    private boolean success;
    private String message;
}



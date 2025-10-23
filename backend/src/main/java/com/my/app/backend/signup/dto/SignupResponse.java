package com.my.app.backend.signup.dto;

import lombok.Data;

@Data
public class SignupResponse {
    private boolean success;
    private String message;
    private String name;
    private String email;
}


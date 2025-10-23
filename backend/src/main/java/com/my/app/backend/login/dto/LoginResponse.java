package com.my.app.backend.login.dto;

import lombok.Data;

@Data
public class LoginResponse {
    private boolean success;
    private String message;
    private String name;
    private String email;
}

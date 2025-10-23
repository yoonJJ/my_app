package com.my.app.backend.login.dto;

import lombok.Data;

@Data
public class SessionResponse {
    private boolean authenticated;
    private String username;
    private String name;
    private String email;
}


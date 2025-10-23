package com.my.app.backend.signup.dto;

import lombok.Data;

@Data
public class CheckEmailResponse {
    private boolean available;
    private String message;
}



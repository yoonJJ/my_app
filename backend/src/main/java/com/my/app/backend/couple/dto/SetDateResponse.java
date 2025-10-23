package com.my.app.backend.couple.dto;

import lombok.Data;

@Data
public class SetDateResponse {
    private boolean success;
    private String message;
    private boolean needToSetNickname;
}



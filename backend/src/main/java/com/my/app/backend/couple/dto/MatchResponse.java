package com.my.app.backend.couple.dto;

import lombok.Data;

@Data
public class MatchResponse {
    private boolean success;
    private String message;
    private Long coupleId;
    private boolean needToSetDate;
}



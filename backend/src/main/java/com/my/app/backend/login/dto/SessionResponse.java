package com.my.app.backend.login.dto;

import lombok.Data;

@Data
public class SessionResponse {
    private boolean authenticated;
    private String username;
    private String name;
    private String email;
    private boolean matched; // 커플 매칭 여부
    private String inviteCode; // 본인의 초대 코드
}


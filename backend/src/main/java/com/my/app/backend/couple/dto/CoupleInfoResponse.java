package com.my.app.backend.couple.dto;

import lombok.Data;

@Data
public class CoupleInfoResponse {
    private boolean matched;
    private boolean needToSetDate;
    private boolean needToSetNickname;
    private String startDate;
    private String myNickname; // 상대방이 나를 부르는 애칭
    private String partnerNickname; // 내가 상대방을 부르는 애칭
    private String partnerName;
}



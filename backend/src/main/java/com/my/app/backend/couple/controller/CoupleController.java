package com.my.app.backend.couple.controller;

import com.my.app.backend.couple.dto.*;
import com.my.app.backend.couple.service.CoupleService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/couple")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@Tag(name = "커플", description = "커플 매칭 및 관리 API")
public class CoupleController {

    @Autowired
    private CoupleService coupleService;

    @Operation(summary = "커플 매칭", description = "초대 코드로 커플을 매칭합니다.")
    @PostMapping("/match")
    public MatchResponse match(@RequestBody MatchRequest request) {
        return coupleService.match(request);
    }

    @Operation(summary = "커플 정보 조회", description = "현재 커플의 정보를 조회합니다.")
    @GetMapping("/info")
    public CoupleInfoResponse getCoupleInfo() {
        return coupleService.getCoupleInfo();
    }

    @Operation(summary = "기념일 설정", description = "커플의 기념일(만난 날)을 설정합니다.")
    @PostMapping("/set-date")
    public SetDateResponse setDate(@RequestBody SetDateRequest request) {
        return coupleService.setDate(request);
    }

    @Operation(summary = "애칭 설정", description = "상대방을 부르는 애칭을 설정합니다.")
    @PostMapping("/set-nickname")
    public SetNicknameResponse setNickname(@RequestBody SetNicknameRequest request) {
        return coupleService.setNickname(request);
    }
}



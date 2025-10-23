package com.my.app.backend.couple.service;

import com.my.app.backend.couple.dto.*;
import com.my.app.backend.user.Couple;
import com.my.app.backend.user.CoupleRepository;
import com.my.app.backend.user.User;
import com.my.app.backend.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class CoupleService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CoupleRepository coupleRepository;

    public MatchResponse match(MatchRequest request) {
        MatchResponse response = new MatchResponse();

        // 현재 로그인한 사용자
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();
        User currentUser = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다."));

        // 이미 커플이 매칭되어 있는지 확인
        if (currentUser.getCoupleId() != null) {
            response.setSuccess(false);
            response.setMessage("이미 매칭된 커플입니다.");
            return response;
        }

        // 초대 코드로 상대방 찾기
        User partner = userRepository.findByInviteCode(request.getInviteCode())
                .orElse(null);

        if (partner == null) {
            response.setSuccess(false);
            response.setMessage("유효하지 않은 초대 코드입니다.");
            return response;
        }

        // 자기 자신의 코드를 입력한 경우
        if (partner.getId().equals(currentUser.getId())) {
            response.setSuccess(false);
            response.setMessage("본인의 초대 코드를 입력할 수 없습니다.");
            return response;
        }

        // 상대방이 이미 매칭되어 있는지 확인
        if (partner.getCoupleId() != null) {
            response.setSuccess(false);
            response.setMessage("이미 매칭된 사용자입니다.");
            return response;
        }

        // WAITING 상태의 커플 찾기 (상대방이 먼저 초대한 경우)
        Couple existingCouple = coupleRepository.findByUser1IdAndStatus(partner.getId(), Couple.CoupleStatus.WAITING)
                .orElse(null);

        if (existingCouple != null) {
            // WAITING 상태의 커플에 현재 사용자를 추가
            existingCouple.setUser2Id(currentUser.getId());
            existingCouple.setStatus(Couple.CoupleStatus.CONNECTED);
            coupleRepository.save(existingCouple);

            // 두 사용자의 couple_id 업데이트
            currentUser.setCoupleId(existingCouple.getId());
            partner.setCoupleId(existingCouple.getId());
            userRepository.save(currentUser);
            userRepository.save(partner);

            response.setSuccess(true);
            response.setMessage("커플 매칭 성공!");
            response.setCoupleId(existingCouple.getId());
            response.setNeedToSetDate(existingCouple.getStartDate() == null);
        } else {
            // 새로운 WAITING 상태 커플 생성
            Couple newCouple = new Couple();
            newCouple.setUser1Id(currentUser.getId());
            newCouple.setUser2Id(null);
            newCouple.setStatus(Couple.CoupleStatus.WAITING);
            Couple savedCouple = coupleRepository.save(newCouple);

            response.setSuccess(true);
            response.setMessage("초대 요청이 전송되었습니다. 상대방이 연결하면 매칭이 완료됩니다.");
            response.setCoupleId(savedCouple.getId());
            response.setNeedToSetDate(false);
        }

        return response;
    }

    public SetDateResponse setDate(SetDateRequest request) {
        SetDateResponse response = new SetDateResponse();

        // 현재 로그인한 사용자
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();
        User currentUser = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다."));

        // 커플 정보 확인
        if (currentUser.getCoupleId() == null) {
            response.setSuccess(false);
            response.setMessage("매칭된 커플이 없습니다.");
            return response;
        }

        Couple couple = coupleRepository.findById(currentUser.getCoupleId())
                .orElseThrow(() -> new RuntimeException("커플 정보를 찾을 수 없습니다."));

        // 날짜 설정
        try {
            LocalDate date = LocalDate.parse(request.getDate());
            couple.setStartDate(date);
            coupleRepository.save(couple);

            response.setSuccess(true);
            response.setMessage("기념일이 설정되었습니다.");
            response.setNeedToSetNickname(true);
        } catch (Exception e) {
            response.setSuccess(false);
            response.setMessage("날짜 형식이 올바르지 않습니다.");
        }

        return response;
    }

    public SetNicknameResponse setNickname(SetNicknameRequest request) {
        SetNicknameResponse response = new SetNicknameResponse();

        // 현재 로그인한 사용자
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();
        User currentUser = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다."));

        // 커플 정보 확인
        if (currentUser.getCoupleId() == null) {
            response.setSuccess(false);
            response.setMessage("매칭된 커플이 없습니다.");
            return response;
        }

        Couple couple = coupleRepository.findById(currentUser.getCoupleId())
                .orElseThrow(() -> new RuntimeException("커플 정보를 찾을 수 없습니다."));

        // 애칭 설정 (내가 상대방을 부르는 애칭)
        if (couple.getUser1Id().equals(currentUser.getId())) {
            couple.setNicknameForUser1(request.getNickname());
        } else if (couple.getUser2Id().equals(currentUser.getId())) {
            couple.setNicknameForUser2(request.getNickname());
        }

        coupleRepository.save(couple);

        response.setSuccess(true);
        response.setMessage("애칭이 설정되었습니다.");

        return response;
    }

    public CoupleInfoResponse getCoupleInfo() {
        CoupleInfoResponse response = new CoupleInfoResponse();

        // 현재 로그인한 사용자
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();
        User currentUser = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다."));

        // 커플 정보 확인
        if (currentUser.getCoupleId() == null) {
            response.setMatched(false);
            return response;
        }

        Couple couple = coupleRepository.findById(currentUser.getCoupleId())
                .orElseThrow(() -> new RuntimeException("커플 정보를 찾을 수 없습니다."));

        response.setMatched(true);
        response.setNeedToSetDate(couple.getStartDate() == null);
        response.setStartDate(couple.getStartDate() != null ? couple.getStartDate().toString() : null);

        // 나의 상대방 찾기
        User partner;
        if (couple.getUser1Id().equals(currentUser.getId())) {
            partner = userRepository.findById(couple.getUser2Id()).orElse(null);
        } else {
            partner = userRepository.findById(couple.getUser1Id()).orElse(null);
        }

        if (partner != null) {
            response.setPartnerName(partner.getName());

            // 내가 상대방을 부르는 애칭
            if (couple.getUser1Id().equals(currentUser.getId())) {
                response.setPartnerNickname(couple.getNicknameForUser1());
            } else {
                response.setPartnerNickname(couple.getNicknameForUser2());
            }

            // 상대방이 나를 부르는 애칭
            if (couple.getUser1Id().equals(currentUser.getId())) {
                response.setMyNickname(couple.getNicknameForUser2());
            } else {
                response.setMyNickname(couple.getNicknameForUser1());
            }

            // 애칭이 아직 설정되지 않은 경우
            response.setNeedToSetNickname(
                    (response.getPartnerNickname() == null || response.getPartnerNickname().isEmpty())
            );
        }

        return response;
    }
}


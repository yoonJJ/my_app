# 커플 추억 APP (이름 미정)

커플을 위한 D-Day, 사진 기록, 채팅, 여행 기록을 관리하는 웹 애플리케이션

## 기술 스택

### Frontend
- **Next.js 15** (React 기반)
- **TypeScript**
- **Tailwind CSS**

### Backend
- **Java 21**
- **Spring Boot 3.5.6**
- **Spring Security** (세션 기반 인증)
- **Spring WebSocket** (실시간 채팅)
- **Spring Data JPA**
- **H2 Database** (개발/테스트용)
- **MySQL** (운영용, MariaDB)
- **Swagger UI** (API 문서화)

## 프로젝트 구조

```
my_app/
├── frontend/          # Next.js 프론트엔드
│   ├── src/
│   │   ├── app/       # 페이지 및 라우팅
│   │   │   ├── page.tsx       # 홈 페이지 (D-Day)
│   │   │   ├── login/         # 로그인 페이지
│   │   │   ├── signup/        # 회원가입 페이지
│   │   │   ├── timeline/      # 타임라인 페이지
│   │   │   ├── photos/        # 사진 앨범
│   │   │   │   ├── page.tsx       # 사진 목록
│   │   │   │   ├── add/           # 사진 추가
│   │   │   │   └── [id]/          # 사진 상세
│   │   │   ├── chat/          # 채팅 페이지
│   │   │   └── settings/      # 설정 페이지
│   │   ├── components/ # 재사용 컴포넌트
│   │   │   ├── Navbar.tsx
│   │   │   └── BottomNavigation.tsx
│   │   └── lib/      # 유틸리티 함수
│   │       └── constants.ts
│   └── public/        # 정적 파일
│
└── backend/           # Spring Boot 백엔드
    ├── src/main/java/com/my/app/backend/
    │   ├── config/      # 설정 파일
    │   │   ├── SecurityConfig.java    # Spring Security 설정
    │   │   └── SwaggerConfig.java     # Swagger UI 설정
    │   ├── login/       # 로그인 관련
    │   │   ├── controller/LoginController.java
    │   │   ├── service/LoginService.java
    │   │   └── dto/     # LoginRequest, LoginResponse, SessionResponse
    │   ├── signup/      # 회원가입 관련
    │   │   ├── controller/SignupController.java
    │   │   ├── service/SignupService.java
    │   │   └── dto/     # SignupRequest, SignupResponse
    │   ├── couple/      # 커플 관리 관련
    │   │   ├── controller/CoupleController.java
    │   │   ├── service/CoupleService.java
    │   │   └── dto/     # MatchRequest, MatchResponse, SetDateRequest, SetNicknameRequest 등
    │   └── user/        # 사용자 엔티티
    │       ├── User.java
    │       ├── Couple.java
    │       ├── CoupleRepository.java
    │       ├── PhoneVerification.java
    │       ├── PhoneVerificationRepository.java
    │       ├── UserRepository.java
    │       └── UserDetailsServiceImpl.java
    └── src/main/resources/
        ├── application.yml
        └── data.sql           # 초기 테스트 데이터
```

## 핵심 기능

### 1. 회원 및 커플 관리
- [x] 회원가입 / 로그인 (세션 기반 인증)
- [x] BCrypt 비밀번호 암호화
- [x] 세션 관리 및 유지
- [x] 커플 코드로 연결
- [x] 기념일 설정
- [x] 애칭 설정
- [x] D-Day 계산 및 표시
- [ ] 프로필 관리

### 2. 사진 기록
- [x] 사진 목록 페이지
- [x] 사진 추가 페이지
- [x] 사진 상세 페이지
- [ ] 사진 업로드 API
- [ ] 캡션 및 태그 추가
- [ ] 날짜별 정렬

### 3. 채팅
- [x] 채팅 페이지 UI
- [x] 고정 헤더/푸터
- [x] 메시지 리스트
- [ ] WebSocket 기반 실시간 대화
- [ ] 채팅 히스토리 저장
- [ ] 읽음 표시

### 4. 여행 기록
- [ ] 지도 기반 위치 기록
- [ ] 방문 장소 마커
- [ ] 사진 및 메모 첨부
- [ ] 날짜별 정렬

### 5. 타임라인
- [x] 타임라인 페이지 UI
- [ ] 통합 추억 뷰
- [ ] 날짜순 정렬
- [ ] 사진 + 채팅 + 여행 통합 표시

### 6. 설정
- [x] 설정 페이지
- [x] 기념일 수정 기능
- [ ] 프로필 수정
- [ ] 알림 설정

## 데이터베이스 스키마

### Users (사용자)
```sql
CREATE TABLE users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(100) NOT NULL,
    phone_number VARCHAR(20) UNIQUE,
    phone_verified BOOLEAN DEFAULT FALSE,
    profile_image_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Phone_Verifications (핸드폰 인증)
```sql
CREATE TABLE phone_verifications (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    phone_number VARCHAR(20) NOT NULL,
    code VARCHAR(6) NOT NULL,
    verified BOOLEAN DEFAULT FALSE,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_phone_number (phone_number)
);
```

### Couples (커플)
```sql
CREATE TABLE couples (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user1_id BIGINT NOT NULL,
    user2_id BIGINT,
    nickname_for_user1 VARCHAR(50),
    nickname_for_user2 VARCHAR(50),
    status ENUM('WAITING', 'CONNECTED', 'BLOCKED') DEFAULT 'WAITING',
    start_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user1_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (user2_id) REFERENCES users(id) ON DELETE CASCADE
);

ALTER TABLE users ADD COLUMN invite_code CHAR(8) UNIQUE;
ALTER TABLE users ADD COLUMN couple_id BIGINT;
ALTER TABLE users ADD CONSTRAINT fk_users_couple FOREIGN KEY (couple_id) REFERENCES couples(id) ON DELETE SET NULL;
```

## API 엔드포인트

### 인증
- `POST /api/login` - 로그인 (세션 생성)
- `POST /api/signup` - 회원가입
- `GET /api/session` - 세션 확인
- `POST /api/logout` - 로그아웃

### 회원가입
- `GET /api/email/check?email={email}` - 이메일 중복 확인
- `POST /api/phone/send-code` - 핸드폰 인증번호 전송
- `POST /api/phone/verify-code` - 핸드폰 인증번호 확인

### 커플 관리
- `POST /api/couple/match` - 초대 코드로 커플 매칭
- `GET /api/couple/info` - 커플 정보 조회
- `POST /api/couple/set-date` - 기념일 설정
- `POST /api/couple/set-nickname` - 애칭 설정

### Swagger UI
- `http://localhost:8081/swagger-ui.html` - API 문서 확인

## 구현된 기능 상세

### 1. 회원가입
- **이메일/전화번호 중복 체크**
- **BCrypt 비밀번호 암호화**
- **핸드폰 번호 인증 (UI만 구현됨)**
- **회원가입 성공 시 로그인 페이지로 이동**

### 2. 로그인
- **세션 기반 인증**
- **Spring Security AuthenticationManager 사용**
- **쿠키 기반 세션 관리 (JSESSIONID)**
- **로그인 성공 시 홈페이지로 이동**

### 3. 세션 관리
- **세션 자동 생성 및 유지**
- **세션 확인 API (`GET /api/session`)**
- **프론트엔드에서 세션 상태 확인**
- **로그인 상태에 따른 UI 표시**

### 4. 보안 설정
- **CORS 설정 (http://localhost:3000 허용)**
- **쿠키 기반 세션 관리**
- **CSRF 비활성화 (개발 환경)**

### 5. 커플 매칭
- **초대 코드 기반 매칭**
- **8자리 랜덤 초대 코드 생성**
- **WAITING 상태 관리** (한쪽이 먼저 초대한 경우)
- **CONNECTED 상태로 자동 전환** (양쪽 모두 매칭 완료)
- **기념일 설정** (만난 날짜)
- **애칭 설정** (상대방을 부르는 애칭)
- **D-Day 자동 계산** (기념일로부터 경과 일수)

### 6. 회원가입 개선
- **이메일 중복 확인** (실시간 검증)
- **핸드폰 번호 인증** (6자리 인증번호)
- **인증번호 유효시간 3분**
- **실시간 타이머 표시**
- **입력 필드 비활성화** (인증 완료 후)

### 7. D-Day 애니메이션
- **서서히 나타나는 효과** (fade-in)
- **숫자 카운트업 효과** (2초 동안 D-Day 숫자 증가)
- **부드러운 전환 효과**

### 8. 내비게이션
- **상단 Navbar**: 로고, 메뉴 (PC/모바일 대응)
- **하단 BottomNavigation**: 홈, 타임라인, 사진, 채팅, 설정
- **모바일**: 햄버거 메뉴 사이드바
- **PC**: 상단 메뉴 표시
- **채팅 페이지**: Navbar 숨김 처리

### 9. 사진 기능
- **사진 목록**: 그리드 레이아웃
- **사진 추가**: 업로드 영역, 제목, 날짜/시간, 위치, 메모 입력
- **사진 상세**: 이미지 슬라이더, 상세 정보, 하단 그리드

### 10. 채팅 기능
- **고정 헤더**: 뒤로가기 버튼 + "채팅" 제목
- **고정 푸터**: 입력란 + 전송 버튼
- **메시지 리스트**: 나/상대방 구분 표시
- **채팅 내용**: 샘플 메시지 16개

### 11. 설정 기능
- **기념일 수정**: 날짜 선택 및 저장
- **미래 날짜 방지**: 서버/클라이언트 검증
- **날짜 형식 검증**: 올바른 날짜 형식 체크





## 개발 로드맵

### Phase 1: 기본 구조
- [x] Next.js 프로젝트 생성
- [x] 메인 페이지 (D-Day 계산)
- [x] 로그인/회원가입 페이지
- [x] Spring Boot 프로젝트 생성
- [x] Swagger UI 설정
- [x] 인증 시스템 (세션 기반)
- [x] 회원가입 API
- [x] 로그인 API

### Phase 2: 백엔드 API (진행 중)
- [x] 세션 관리 API
- [x] 커플 관리 API
- [x] 초대 코드 매칭
- [x] 기념일 설정
- [x] 애칭 설정
- [ ] 사진 업로드 API
- [ ] 채팅 WebSocket
- [ ] 여행 기록 API

### Phase 3: 프론트엔드 기능
- [x] 회원가입 페이지
- [x] 로그인 페이지
- [x] 세션 확인 기능
- [x] 커플 매칭 화면
- [x] 기념일 설정 화면
- [x] 애칭 설정 화면
- [x] D-Day 표시 화면
- [x] D-Day 애니메이션 효과
- [x] 사진 앨범 페이지 (UI)
- [x] 채팅 페이지 (UI)
- [x] 타임라인 페이지 (UI)
- [x] 설정 페이지
- [x] 내비게이션 (Navbar, BottomNavigation)
- [ ] 여행 기록 페이지

### Phase 4: 고급 기능
- [ ] PWA 설정
- [ ] 푸시 알림
- [ ] 다크모드
- [ ] 이미지 최적화

### Phase 5: iOS 전환
- [ ] React Native 이식
- [ ] iOS 빌드
- [ ] 앱스토어 제출

## 실행 방법

### Frontend
```bash
cd frontend
npm install
npm run dev
```
프론트엔드는 `http://localhost:3000` 에서 실행됩니다.

### Backend
```bash
cd backend
./gradlew bootRun
```
백엔드는 `http://localhost:8081`에서 실행됩니다.

### 데이터베이스
- **H2 Console**: `http://localhost:8081/h2-console`
- **JDBC URL**: `jdbc:h2:mem:testdb`
- **Username**: `sa`
- **Password**: (비어있음)

### Swagger UI
- **URL**: `http://localhost:8081/swagger-ui.html`

### 테스트 계정
모든 계정의 비밀번호는 `123123`입니다.

#### 매칭된 커플 (기념일 있음)
- **계정 1**: `karina411@test.com` (유지민) - Invite Code: `HYERI01`
- **계정 2**: `winter0101@test.com` (김민정) - Invite Code: `JEONG01`
- 매칭 상태: CONNECTED
- 기념일: 2020-11-17

#### 매칭된 커플 (기념일 없음)
- **계정 3**: `jeongjae124@test.com` (윤정재) - Invite Code: `JJEONG01`
- **계정 4**: `haeun123@test.com` (이하은) - Invite Code: `HAEUN01`
- 매칭 상태: CONNECTED
- 기념일: 미설정

#### 미매칭 계정
- **계정 5**: `wonyoung123@test.com` (장원영) - Invite Code: `JIMIN01`
- **계정 6**: `youjin123@test.com` (안유진) - Invite Code: `MINJI01`
- 매칭 상태: 미매칭

## 주요 기술 구현

### 1. 세션 기반 인증
- Spring Security의 `HttpSession` 사용
- 로그인 시 세션 생성 및 쿠키 설정
- 각 요청마다 세션 쿠키로 인증 확인

### 2. BCrypt 비밀번호 암호화
- Spring Security의 `BCryptPasswordEncoder` 사용
- 비밀번호 저장 시 자동 해싱
- 로그인 시 해시 비교

### 3. CORS 설정
- 프론트엔드(`http://localhost:3000`) 허용
- 쿠키 포함 요청 허용 (`credentials: true`)
- 세션 API 공개 접근 허용

### 4. UI/UX
- 모던하고 깔끔한 디자인
- 핑크/퍼플 그라데이션 사용 (로고 영역)
- 반응형 디자인 (모바일/데스크톱)
- 로딩 상태 및 에러 메시지 표시
- D-Day 애니메이션 효과
- 고정 헤더/푸터 (채팅 페이지)
- 햄버거 메뉴 사이드바 (모바일)

## 문제 해결

### 세션 생성 문제
- **문제**: 로그인 후 세션이 생성되지 않음
- **해결**: `HttpSession`을 명시적으로 생성하고 `SecurityContext`를 저장

### CORS 에러
- **문제**: 프론트엔드에서 API 호출 시 CORS 에러 발생
- **해결**: `CorsConfigurationSource` Bean 추가 및 설정

### 비밀번호 불일치
- **문제**: 로그인 시 비밀번호가 일치하지 않음
- **해결**: BCrypt 해시 재생성 및 `data.sql` 업데이트

## 향후 계획

1. ~~**커플 연결 기능**: 초대 코드 기반으로 커플 연결~~ (완료)
2. ~~**UI/UX 개선**: D-Day 애니메이션, 내비게이션, 고정 헤더/푸터~~ (완료)
3. ~~**페이지 구현**: 사진, 채팅, 타임라인, 설정 페이지 UI~~ (완료)
4. **사진 업로드**: 파일 업로드 및 S3 연동
5. **실시간 채팅**: WebSocket 구현
6. **여행 기록**: 지도 API 연동
7. **타임라인**: 통합 추억 뷰 및 데이터 연동

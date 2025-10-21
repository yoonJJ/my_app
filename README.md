# 우리의 하루 (WeDay) - 커플 추억 아카이브

커플을 위한 D-Day, 사진 기록, 채팅, 여행 기록을 관리하는 웹 애플리케이션

## 기술 스택

### Frontend
- **Next.js 15** (React 기반)
- **TypeScript**
- **Tailwind CSS**

### Backend
- **Java 21**
- **Spring Boot 3.x**
- **Spring Security** (JWT 인증)
- **Spring WebSocket** (실시간 채팅)
- **MySQL** (데이터베이스)
- **개인용 미니pc** (파일 저장소)

## 프로젝트 구조

```
my_app/
├── frontend/          # Next.js 프론트엔드
│   ├── src/
│   │   ├── app/       # 페이지 및 라우팅
│   │   ├── components/ # 재사용 컴포넌트
│   │   ├── store/     # Zustand 상태 관리
│   │   └── api/       # API 호출 함수
│   └── public/        # 정적 파일
│
└── backend/           # Spring Boot 백엔드
    ├── src/main/java/
    │   ├── controller/ # REST API 컨트롤러
    │   ├── service/    # 비즈니스 로직
    │   ├── repository/ # 데이터베이스 접근
    │   ├── entity/     # 엔티티 모델
    │   ├── dto/        # 데이터 전송 객체
    │   └── config/     # 설정 파일
    └── src/main/resources/
        └── application.yml
```

## 핵심 기능

### 1. 회원 및 커플 관리
- 회원가입 / 로그인 (JWT 인증)
- 커플 코드로 연결
- 프로필 관리
- D-Day 계산 및 표시

### 2. 사진 기록
- 날짜별 앨범 생성
- 사진 업로드
- 캡션 및 태그 추가
- 타임라인 뷰

### 3. 실시간 채팅
- WebSocket 기반 실시간 대화
- 채팅 히스토리 저장
- 읽음 표시

### 4. 여행 기록
- 지도 기반 위치 기록
- 방문 장소 마커
- 사진 및 메모 첨부
- 날짜별 정렬

### 5. 타임라인
- 통합 추억 뷰
- 날짜순 정렬
- 사진 + 채팅 + 여행 통합 표시

## 데이터베이스 스키마

### Users (사용자)
```sql
- id (PK)
- email
- password (암호화)
- name
- profile_image_url
- created_at
```

### Couples (커플)
```sql
- id (PK)
- user1_id (FK)
- user2_id (FK)
- start_date (만난 날)
- status
- created_at
```

### Photos (사진)
```sql
- id (PK)
- couple_id (FK)
- image_url (S3)
- caption
- location
- created_at
```

### Messages (채팅)
```sql
- id (PK)
- couple_id (FK)
- sender_id (FK)
- content
- created_at
```

### Travels (여행)
```sql
- id (PK)
- couple_id (FK)
- title
- location_name
- latitude
- longitude
- date
- memo
- image_url
```

## API 엔드포인트

### 인증
- `POST /api/auth/signup` - 회원가입
- `POST /api/auth/login` - 로그인
- `POST /api/auth/logout` - 로그아웃

### 커플
- `POST /api/couple/invite` - 커플 초대
- `GET /api/couple/info` - 커플 정보 조회
- `PUT /api/couple/start-date` - 만난 날 수정

### 사진
- `GET /api/photos` - 사진 목록 조회
- `POST /api/photos` - 사진 업로드
- `DELETE /api/photos/:id` - 사진 삭제

### 채팅
- `GET /api/chat/messages` - 채팅 내역 조회
- WebSocket: `/ws/chat` - 실시간 채팅

### 여행
- `GET /api/travels` - 여행 기록 조회
- `POST /api/travels` - 여행 기록 추가
- `PUT /api/travels/:id` - 여행 기록 수정

### 타임라인
- `GET /api/timeline` - 통합 타임라인 조회

## 개발 로드맵

### Phase 1: 기본 구조 (현재)
- [x] Next.js 프로젝트 생성
- [x] 메인 페이지 (D-Day 계산)
- [x] 로그인/회원가입 페이지
- [ ] Spring Boot 프로젝트 생성

### Phase 2: 백엔드 API
- [ ] 인증 API (JWT)
- [ ] 커플 관리 API
- [ ] 사진 업로드 API
- [ ] 채팅 WebSocket
- [ ] 여행 기록 API

### Phase 3: 프론트엔드 기능
- [ ] 사진 앨범 페이지
- [ ] 채팅 페이지
- [ ] 여행 기록 페이지
- [ ] 타임라인 페이지

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

### Backend
```bash
cd backend
./mvnw spring-boot:run
```

## 배포

- Frontend: Vercel
- Backend: AWS EC2
- Database: AWS RDS (MySQL)
- Storage: AWS S3

## iOS 전환 전략

1. **PWA** (단기): next-pwa로 홈화면 추가
2. **React Native** (중기): Expo로 iOS 앱 개발
3. **Capacitor** (대안): 웹뷰로 감싸기

## 라이센스

MIT

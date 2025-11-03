-- 테스트 계정 데이터 삽입
-- 비밀번호: 123123 (BCrypt로 해시화된 값)
INSERT INTO users (email, password_hash, name, phone_number, phone_verified, invite_code, created_at) VALUES
('jeongjae124@test.com', '$2a$12$wwLILcmd9VfGiweSFLhIueIg5o1mHWPPr3CTv7h1kVfUCCBujbINq', '윤정재', '010-1234-5678', TRUE, 'JJEONG01', CURRENT_TIMESTAMP),
('haeun123@test.com', '$2a$12$wwLILcmd9VfGiweSFLhIueIg5o1mHWPPr3CTv7h1kVfUCCBujbINq', '이하은', '010-9876-5432', TRUE, 'HAEUN01', CURRENT_TIMESTAMP),
('karina411@test.com', '$2a$12$wwLILcmd9VfGiweSFLhIueIg5o1mHWPPr3CTv7h1kVfUCCBujbINq', '유지민', '010-1111-2222', TRUE, 'HYERI01', CURRENT_TIMESTAMP),
('winter0101@test.com', '$2a$12$wwLILcmd9VfGiweSFLhIueIg5o1mHWPPr3CTv7h1kVfUCCBujbINq', '김민정', '010-2222-1111', TRUE, 'JEONG01', CURRENT_TIMESTAMP),
('wonyoung123@test.com', '$2a$12$wwLILcmd9VfGiweSFLhIueIg5o1mHWPPr3CTv7h1kVfUCCBujbINq', '장원영', '010-3333-4444', TRUE, 'JIMIN01', CURRENT_TIMESTAMP),
('youjin123@test.com', '$2a$12$wwLILcmd9VfGiweSFLhIueIg5o1mHWPPr3CTv7h1kVfUCCBujbINq', '안유진', '010-4444-5555', TRUE, 'MINJI01', CURRENT_TIMESTAMP);



-- 커플 연결: karina411@test.com과 winter0101@test.com을 연결 (만난 날짜 있음)
INSERT INTO couples (user1_id, user2_id, status, start_date, created_at) VALUES
(3, 4, 'CONNECTED', '2020-11-17', CURRENT_TIMESTAMP);

-- 각 사용자의 couple_id 업데이트
UPDATE users SET couple_id = 1 WHERE email IN ('karina411@test.com', 'winter0101@test.com');

-- 커플 연결: jeongjae124@test.com과 haeun123@test.com을 연결 (만난 날짜 없음)
INSERT INTO couples (user1_id, user2_id, status, start_date, created_at) VALUES
(1, 2, 'CONNECTED', NULL, CURRENT_TIMESTAMP);

-- 각 사용자의 couple_id 업데이트
UPDATE users SET couple_id = 2 WHERE email IN ('jeongjae124@test.com', 'haeun123@test.com');

-- fetch("http://localhost:8081/api/session", { credentials: "include" })
--   .then(r => r.json())
--   .then(console.log)
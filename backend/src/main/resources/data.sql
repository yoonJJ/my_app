-- 테스트 계정 데이터 삽입
-- 비밀번호: 123123 (BCrypt로 해시화된 값)
INSERT INTO users (email, password_hash, name, phone_number, phone_verified, invite_code, created_at) VALUES
('jeongjae124@test.com', '$2a$12$wwLILcmd9VfGiweSFLhIueIg5o1mHWPPr3CTv7h1kVfUCCBujbINq', '윤정재', '010-1234-5678', TRUE, 'JJEONG01', CURRENT_TIMESTAMP),
('haeun123@test.com', '$2a$12$wwLILcmd9VfGiweSFLhIueIg5o1mHWPPr3CTv7h1kVfUCCBujbINq', '이하은', '010-9876-5432', TRUE, 'HAEUN01', CURRENT_TIMESTAMP),
('hyeri0508@test.com', '$2a$12$wwLILcmd9VfGiweSFLhIueIg5o1mHWPPr3CTv7h1kVfUCCBujbINq', '유혜리', '010-1111-2222', TRUE, 'HYERI01', CURRENT_TIMESTAMP),
('jeongjae1204@test.com', '$2a$12$wwLILcmd9VfGiweSFLhIueIg5o1mHWPPr3CTv7h1kVfUCCBujbINq', '윤정재', '010-2222-1111', TRUE, 'JEONG01', CURRENT_TIMESTAMP);

-- 커플 연결: hyeri0508@test.com과 jeongjae1204@test.com을 연결
INSERT INTO couples (user1_id, user2_id, status, start_date, created_at) VALUES
(3, 4, 'CONNECTED', '2024-01-01', CURRENT_TIMESTAMP);

-- 각 사용자의 couple_id 업데이트
UPDATE users SET couple_id = 1 WHERE email IN ('hyeri0508@test.com', 'jeongjae1204@test.com');

-- fetch("http://localhost:8081/api/session", { credentials: "include" })
--   .then(r => r.json())
--   .then(console.log)
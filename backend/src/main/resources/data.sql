-- 테스트 계정 데이터 삽입
-- 비밀번호: 123123 (BCrypt로 해시화된 값)
INSERT INTO `users` (`email`, `password_hash`, `name`, `phone_number`, `phone_verified`, `created_at`) VALUES
('jeongjae124@test.com', '$2a$12$wwLILcmd9VfGiweSFLhIueIg5o1mHWPPr3CTv7h1kVfUCCBujbINq', '정재', '010-1234-5678', TRUE, CURRENT_TIMESTAMP),
('haeun123@test.com', '$2a$12$wwLILcmd9VfGiweSFLhIueIg5o1mHWPPr3CTv7h1kVfUCCBujbINq', '하은', '010-9876-5432', TRUE, CURRENT_TIMESTAMP);

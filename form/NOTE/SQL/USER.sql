-- Active: 1758440462829@@127.0.0.1@3306@alohaforms

SET FOREIGN_KEY_CHECKS = 0;

-- 기본 데이터
TRUNCATE TABLE `users`;
TRUNCATE TABLE `user_auth`;



-- BCryptPasswordEncoder - 암호화 시
-- 사용자
INSERT INTO users ( id, username, password, name, tel, email )
VALUES ( UUID(), 'user', '$2a$12$TrN..KcVjciCiz.5Vj96YOBljeVTTGJ9AUKmtfbGpgc9hmC7BxQ92', '사용자', '010-1234-5678', 'user@mail.com' );

-- 관리자
INSERT INTO users ( id, username, password, name, tel, email )
VALUES ( UUID(), 'admin', '$2a$12$TrN..KcVjciCiz.5Vj96YOBljeVTTGJ9AUKmtfbGpgc9hmC7BxQ92', '관리자', '010-9876-5432', 'admin@mail.com' );


-- 테스트
INSERT INTO users ( id, username, password, name, tel, email )
VALUES ( UUID(), 'test', '$2a$12$TrN..KcVjciCiz.5Vj96YOBljeVTTGJ9AUKmtfbGpgc9hmC7BxQ92', '테스트', '010-1111-2222', 'test@mail.com' );



-- 권한
-- 사용자 
-- * 권한 : ROLE_USER
INSERT INTO user_auth ( id, user_no, username,  auth )
VALUES ( UUID(), (SELECT no FROM users WHERE username = 'user'), 'user', 'ROLE_USER' );

-- 관리자
-- * 권한 : ROLE_USER, ROLE_ADMIN
INSERT INTO user_auth ( id, user_no, username,  auth )
VALUES ( UUID(), (SELECT no FROM users WHERE username = 'admin'), 'admin', 'ROLE_USER' );

INSERT INTO user_auth ( id, user_no, username,  auth )
VALUES ( UUID(), (SELECT no FROM users WHERE username = 'admin'), 'admin', 'ROLE_ADMIN' );

-- 사용자 
-- * 권한 : ROLE_USER
INSERT INTO user_auth ( id, user_no, username,  auth )
VALUES ( UUID(), (SELECT no FROM users WHERE username = 'test'), 'test', 'ROLE_USER' );


SET FOREIGN_KEY_CHECKS = 1;
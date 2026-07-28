-- Active: 1781005331341@@127.0.0.1@3306@suhodaehaeng
-- forms 테이블 서류 처리 방법 컬럼 추가 (2026-07-29)
ALTER TABLE `forms` ADD COLUMN `doc_handling` TEXT NULL COMMENT '서류 처리 방법 (관리사무소 제출 / 소화전·우편함 보관)' AFTER `request`;

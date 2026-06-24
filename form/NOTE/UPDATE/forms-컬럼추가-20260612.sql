-- Active: 1781005331341@@127.0.0.1@3306@suhodaehaeng
ALTER TABLE `forms` ADD COLUMN `building` VARCHAR(255) NOT NULL COMMENT '건물명' AFTER `detail_address`;
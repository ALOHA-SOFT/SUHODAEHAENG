-- Active: 1768221355775@@suhodaehaeng.com@3306@suhodaehaeng
SET FOREIGN_KEY_CHECKS = 0;

-- USE `alohaforms`;

DROP TABLE IF EXISTS `sample`;

CREATE TABLE `sample` (
	`no` BIGINT NOT NULL AUTO_INCREMENT COMMENT 'PK',
	`id` VARCHAR(64) NOT NULL UNIQUE COMMENT 'UK',
	`name` VARCHAR(100) NOT NULL COMMENT '이름',
	`created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '등록일자',
	`updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '수정일자',
	PRIMARY KEY (`no`)
);

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
	`no` BIGINT NOT NULL AUTO_INCREMENT COMMENT 'PK',
	`id` VARCHAR(64) NOT NULL UNIQUE COMMENT 'UK',
	`username` VARCHAR(100) NOT NULL UNIQUE COMMENT '아이디',
	`password` VARCHAR(100) NOT NULL COMMENT '비밀번호',
	`name` VARCHAR(100) NOT NULL COMMENT '이름',
	`tel` VARCHAR(100) NOT NULL COMMENT '전화번호',
	`email` VARCHAR(100) NOT NULL COMMENT '이메일',
	`enabled` TINYINT(1) NOT NULL DEFAULT 1 COMMENT '활성화여부',
	`created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '등록일자',
	`updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP	COMMENT '수정일자'
			,
	PRIMARY KEY (`no`)
);

DROP TABLE IF EXISTS `user_auth`;

CREATE TABLE `user_auth` (
	`no` BIGINT NOT NULL AUTO_INCREMENT COMMENT 'PK',
	`id` VARCHAR(64) NOT NULL UNIQUE COMMENT 'UK',
	`user_no` BIGINT NOT NULL COMMENT 'FK',
	`username` VARCHAR(100) NOT NULL COMMENT '아이디',
	`auth` VARCHAR(100) NOT NULL COMMENT '권한',
	`created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '등록일자',
	`updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '수정일자',
	PRIMARY KEY (`no`),
	FOREIGN KEY (`user_no`) REFERENCES `users` (`no`) ON DELETE CASCADE ON UPDATE CASCADE
);

DROP TABLE IF EXISTS `forms`;

CREATE TABLE `forms` (
	`no` BIGINT NOT NULL AUTO_INCREMENT COMMENT 'PK',
	`id` VARCHAR(64) NOT NULL UNIQUE COMMENT 'UK',
	`first_service` VARCHAR(10) NOT NULL COMMENT '첫번째 서비스 (1:입주민 동의서, 2:승강기 기타 보양, 3:행위허가)',
	`second_service` VARCHAR(10) NOT NULL COMMENT '두번째 서비스 (1:방충망 시공, 2:종합 청소)',
	`terms` VARCHAR(10) NOT NULL COMMENT '약관동의 (1:개인정보 수집 및 이용동의, 2:개인정보 제3자 제공 동의, 3:마케팅 활용정보 동의)',
	`std_date` DATE NOT NULL COMMENT '공사 시작일',
	`end_date` DATE NOT NULL COMMENT '공사 종료일',
	`noise_date` TEXT COMMENT '소음 발생일 (YYYY-MM-DD, 여러날짜 콤마구분)',
	`address` VARCHAR(255) NOT NULL COMMENT '주소',
	`detail_address` VARCHAR(255) NOT NULL COMMENT '상세주소 (101동 101호)',
	`name` VARCHAR(100) NOT NULL COMMENT '신청인명',
	`tel` VARCHAR(20) NOT NULL COMMENT '신청인 전화번호',
	`biz_name` VARCHAR(255) COMMENT '업체명 (신청인이 업체일 경우)',
	`manager_name` VARCHAR(100) COMMENT '현장 담당자명',
	`manager_tel` VARCHAR(20) COMMENT '현장 담당자 연락처 (숫자만)',
	`resident_name` VARCHAR(100) COMMENT '입주자명',
	`resident_tel` VARCHAR(20) COMMENT '입주자 연락처 (숫자만)',
	`resident_same` CHAR(1) NOT NULL DEFAULT 'N' COMMENT '신청인과 동일 여부 (Y/N)',
	`resident_check` CHAR(1) NOT NULL DEFAULT 'N' COMMENT '입주자명 추후 통보 여부 (Y/N)',
	`content` TEXT COMMENT '공사 내용',
	`agreement_terms` TEXT COMMENT '동의서 조건',
	`agreement_condition_check` CHAR(1) DEFAULT 'N' COMMENT '관리사무소 조건 확인 여부 (Y/N)',
	`protection_types` VARCHAR(255) COMMENT '필요한 보양 (다중선택: 올보양, 준보양, 하프보양, 기타보양(바닥,벽))',
	`protection_description` TEXT COMMENT '필요한 보양 설명',
	`elevator_protection` CHAR(1) DEFAULT 'N' COMMENT '승강기 외부 보양여부 (Y:예, N:아니오, A:관리사무소 조건대로)',
	`elevator_floors` VARCHAR(100) COMMENT '시공 층수',
	`entrance_password` VARCHAR(100) COMMENT '현관 비밀번호',
	`property_status` VARCHAR(50) COMMENT '매물상태 (소유자, 매매중, 분양중)',
	`construction_scope` VARCHAR(255) COMMENT '공사범위 (다중선택: 확장, 비내력벽 철거및신설)',
	`construction_scope_description` TEXT COMMENT '공사범위 상세 설명',
	`request` TEXT COMMENT '요청 사항',
	`status` VARCHAR(20) NOT NULL DEFAULT '접수' COMMENT '신청서 상태 (접수, 검토중, 승인, 반려, 완료)',
	`created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '작성 일시',
	`updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '수정 일시',
	PRIMARY KEY (`no`)
) COMMENT='신청서';

DROP TABLE IF EXISTS `schedules`;

CREATE TABLE `schedules` (
	`no` BIGINT NOT NULL AUTO_INCREMENT COMMENT 'PK',
	`id` VARCHAR(64) NOT NULL UNIQUE COMMENT 'UK',
	`form_no` BIGINT COMMENT 'FK (forms.no)',
	`title` VARCHAR(255) NOT NULL COMMENT '일정 제목 (ex. 방충망 시공, 종합 청소)',
	`note` TEXT COMMENT '일정 내용',
	`start` DATE NOT NULL COMMENT '시작일',
	`end` DATE NOT NULL COMMENT '종료일',
	`color` VARCHAR(20) DEFAULT '#007bff' COMMENT '캘린더 색상',
	`created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '작성 일시',
	`updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '수정 일시',
	PRIMARY KEY (`no`),
	FOREIGN KEY (`form_no`) REFERENCES `forms` (`no`) ON DELETE SET NULL ON UPDATE CASCADE
) COMMENT='스케쥴';

DROP TABLE IF EXISTS `notices`;

CREATE TABLE `notices` (
	`no` BIGINT NOT NULL AUTO_INCREMENT COMMENT 'PK',
	`id` VARCHAR(64) NOT NULL UNIQUE COMMENT 'UK',
	`title` VARCHAR(255) NOT NULL COMMENT '공지 제목',
	`content` LONGTEXT NOT NULL COMMENT '공지 내용',
	`author` VARCHAR(100) NOT NULL COMMENT '작성자',
	`status` VARCHAR(20) NOT NULL DEFAULT '공개' COMMENT '공개상태 (공개/비공개)',
	`created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '작성 일시',
	`updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '수정 일시',
	PRIMARY KEY (`no`)
) COMMENT='공지사항';

DROP TABLE IF EXISTS `inquiries`;

CREATE TABLE `inquiries` (
	`no` BIGINT NOT NULL AUTO_INCREMENT COMMENT 'PK',
	`id` VARCHAR(64) NOT NULL UNIQUE COMMENT 'UK',
	`name` VARCHAR(100) NOT NULL COMMENT '문의자명',
	`email` VARCHAR(100) NOT NULL COMMENT '이메일',
	`phone` VARCHAR(20) NOT NULL COMMENT '전화번호',
	`title` VARCHAR(255) NOT NULL COMMENT '제목',
	`content` LONGTEXT NOT NULL COMMENT '문의 내용',
	`status` VARCHAR(20) NOT NULL DEFAULT '대기' COMMENT '상태 (대기/답변완료)',
	`reply_content` LONGTEXT COMMENT '답변 내용',
	`reply_at` TIMESTAMP NULL COMMENT '답변 일시',
	`created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '작성 일시',
	`updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '수정 일시',
	PRIMARY KEY (`no`)
) COMMENT='문의사항';

SET FOREIGN_KEY_CHECKS = 1;


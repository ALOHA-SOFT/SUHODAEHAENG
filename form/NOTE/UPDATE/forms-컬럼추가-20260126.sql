-- Active: 1764402156272@@suhodaehaeng.com@3306@suhodaehaeng
ALTER TABLE forms 
ADD COLUMN agreement_condition_check CHAR(1) DEFAULT 'N' COMMENT '관리사무소 조건 확인 여부 (Y/N)' AFTER agreement_terms,
ADD COLUMN elevator_conditions TEXT COMMENT '승강기 보양 관리사무소 조건' AFTER elevator_floors;


ALTER TABLE forms 
MODIFY COLUMN elevator_protection CHAR(1) DEFAULT 'N' COMMENT '승강기 외부 보양여부 (Y:예, N:아니오, A:관리사무소 조건대로)',
DROP COLUMN elevator_conditions;
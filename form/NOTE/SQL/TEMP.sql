INSERT INTO forms (
    id, first_service, second_service, terms, std_date, end_date, noise_date,
    address, detail_address, name, tel, email, biz_name,
    created_at, updated_at
) VALUES 
(
    'form001', '1', '1', '1,2,3', '2024-07-01', '2024-07-05', '2024-07-02,2024-07-03',
    '123 Main St, Apt 101', '101동 101호', '홍길동', '010-1234-5678', 'honggildong@example.com', '홍길동건설',
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
),
(
    'form002', '2', '2', '1,3', '2024-08-10', '2024-08-15', '2024-08-12',
    '456 Oak St, Apt 202', '202동 202호', '김철수', '010-8765-4321', 'kimchulsoo@example.com', '김철수건설',
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
),
(
    'form003', '3', '1', '2,3', '2024-09-05', '2024-09-10', '2024-09-07,2024-09-08',
    '789 Pine St, Apt 303', '303동 303호', '이영희', '010-1122-3344', 'lee-younghee@example.com', '이영희건설',
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
)
;

-- 현재 데이터 조회해서 그대로 INSERT 문 작성
INSERT INTO 
    forms 
    (
    id, first_service, second_service, terms, std_date, end_date, noise_date,
    address, detail_address, name, tel, email, biz_name,
    created_at, updated_at
)
SELECT 
    UUID(), first_service, second_service, terms, std_date, end_date, noise_date,
    address, detail_address, name, tel, email, biz_name,
    created_at, updated_at
FROM forms;

package com.aloha.form.domain;

import java.util.Date;

import org.apache.ibatis.type.Alias;
import org.springframework.format.annotation.DateTimeFormat;

import com.baomidou.mybatisplus.annotation.TableName;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@TableName("forms")
@Alias("Forms")
public class Forms extends Base {

    private String firstService;        // 첫번째 서비스 (1:입주민 동의서, 2:승강기 기타 보양, 3:행위허가)
    private String secondService;       // 두번째 서비스 (1:방충망 시공, 2:종합 청소)
    private String terms;               // 약관동의 (1:개인정보 수집 및 이용동의, 2:개인정보 제3자 제공 동의, 3:마케팅 활용정보 동의)
    private String status;              // 신청서 상태 (접수, 검토중, 승인, 반려, 완료)
    

    /* =============== 공통 양식 =============== */
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date stdDate;               // 공사 시작일
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date endDate;               // 공사 종료일
    private String noiseDate;           // 소음 발생일 (YYYY-MM-DD, 여러날짜 콤마구분)
    private String address;             // 주소
    private String detailAddress;       // 상세주소 (101동 101호)
    private String name;                // 신청인명
    private String tel;                 // 신청인 전화번호
    private String request;             // 요청사항
    /* =============== 공통 양식 =============== */
    
    /* =============== (1) 입주민동의서 개별양식 =============== */
    private String bizName;             // 업체명
    private String managerName;         // 대표자명
    private String managerTel;          // 업체 전화번호

    private String residentName;        // 세대주명
    private String residentTel;         // 세대주 전화번호
    private String residentSame;        // 신청인과 동일 여부 (Y/N)
    private String residentCheck;       // 세대주명 추후 통보 여부 (Y/N)

    private String agreementTerms;      // 동의서 조건 (detail.html에서 agreementTerms로 사용)
    private String agreementConditionCheck; // 관리사무소 조건 확인 여부 (Y/N)

    private String content;             // 공사 내용
    /* =============== (1) 입주민동의서 개별양식 =============== */


    /* =============== (2) 승강기 및 기타보양 개별양식 =============== */
    private String protectionTypes;            // 필요한 보양 (다중선택: 올보양, 준보양, 하프보양, 기타보양(바닥,벽))
    private String protectionDescription;      // 필요한 보양 설명
    private String elevatorProtection;         // 승강기 외부 보양여부 (Y:예, N:아니오, A:관리사무소 조건대로)
    private String elevatorFloors;             // 시공 층수
    private String entrancePassword;          // 현관 비밀번호
    /* =============== (2) 승강기 및 기타보양 개별양식 =============== */



    /* =============== (3) 행위허가 신청서 개별양식 =============== */
    private String propertyStatus;                      // 매물상태 (소유자, 매매중, 분양중)
    private String constructionScope;                   // 공사범위 (다중선택: 확장, 비내력벽 철거및신설)
    private String constructionScopeDescription;        // 공사범위 상세 설명
    /* =============== (3) 행위허가 신청서 개별양식 =============== */
    
    
    

}
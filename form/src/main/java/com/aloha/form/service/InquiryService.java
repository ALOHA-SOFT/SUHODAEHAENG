package com.aloha.form.service;

import java.util.List;

import com.aloha.form.domain.Inquiry;
import com.aloha.form.domain.common.QueryParams;
import com.github.pagehelper.PageInfo;

public interface InquiryService extends BaseService<Inquiry> {
    
    // 상태별 문의사항 목록 조회
    List<Inquiry> listByStatus(String status) throws Exception;

    // 페이징
    PageInfo<Inquiry> page(QueryParams params) throws Exception;
    PageInfo<Inquiry> pageByStatus(QueryParams params, String status) throws Exception;

    // 문의사항 등록
    boolean insert(Inquiry inquiry);
    
    // 문의사항 수정
    boolean update(Inquiry inquiry);

    // 문의사항 삭제
    boolean delete(String id);
    
    // 답변 추가
    boolean reply(Inquiry inquiry);
    
}

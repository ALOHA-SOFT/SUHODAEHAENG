package com.aloha.form.service;

import java.util.List;

import com.aloha.form.domain.Notice;
import com.aloha.form.domain.common.QueryParams;
import com.github.pagehelper.PageInfo;

public interface NoticeService extends BaseService<Notice> {
    
    // 상태별 공지사항 목록 조회
    List<Notice> listByStatus(String status) throws Exception;

    // 페이징
    PageInfo<Notice> page(QueryParams params) throws Exception;
    PageInfo<Notice> pageByStatus(QueryParams params, String status) throws Exception;

    // 공지사항 등록
    boolean insert(Notice notice);
    
    // 공지사항 수정
    boolean update(Notice notice);

    // 공지사항 삭제
    boolean delete(String id);
    
}

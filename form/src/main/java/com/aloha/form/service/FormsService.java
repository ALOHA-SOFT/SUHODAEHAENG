package com.aloha.form.service;

import java.util.List;
import java.util.Map;

import com.aloha.form.domain.Forms;
import com.aloha.form.domain.common.QueryParams;
import com.github.pagehelper.PageInfo;

public interface FormsService extends BaseService<Forms> {
    
    // 상태별 설문 목록 조회
    List<Forms> listByStatus(String status) throws Exception;

    // 페이징
    PageInfo<Forms> page(QueryParams params) throws Exception;
    PageInfo<Forms> pageByStatus(QueryParams params, String status) throws Exception;

    // 설문 등록
    boolean insert(Forms forms);
    
    // 설문 수정
    boolean update(Forms forms);

    // 설문 삭제
    boolean delete(String id);
    
    // 상태별 개수 조회
    Map<String, Integer> getStatusCount() throws Exception;
    
}
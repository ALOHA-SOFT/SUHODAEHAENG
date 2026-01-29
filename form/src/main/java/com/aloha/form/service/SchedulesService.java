package com.aloha.form.service;

import java.time.LocalDate;
import java.util.List;

import com.aloha.form.domain.Schedules;
import com.aloha.form.domain.common.QueryParams;
import com.github.pagehelper.PageInfo;

public interface SchedulesService extends BaseService<Schedules> {
    
    // 특정 기간 일정 조회
    List<Schedules> listByDateRange(LocalDate startDate, LocalDate endDate) throws Exception;
    
    // 설문 기반 일정 조회
    List<Schedules> listByFormNo(Long formNo) throws Exception;
    
    // 설문 기반 일정 자동 생성
    int createFromForm(Long formNo) throws Exception;

    PageInfo<Schedules> page(QueryParams queryParams) throws Exception;
    
}
package com.aloha.form.service;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.aloha.form.domain.Schedules;
import com.aloha.form.domain.common.QueryParams;
import com.aloha.form.mapper.SchedulesMapper;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class SchedulesServiceImpl extends BaseServiceImpl<Schedules, SchedulesMapper> implements SchedulesService {

    @Autowired
    private SchedulesMapper schedulesMapper;


    @Override
    public List<Schedules> listByDateRange(LocalDate startDate, LocalDate endDate) throws Exception {
        List<Schedules> schedulesList = schedulesMapper.selectSchedulesByDateRange(startDate, endDate);
        return schedulesList;
    }

    @Override
    public List<Schedules> listByFormNo(Long formNo) throws Exception {
        List<Schedules> schedulesList = schedulesMapper.selectSchedulesByFormNo(formNo);
        return schedulesList;
    }

    @Override
    public int createFromForm(Long formNo) throws Exception {
        int result = schedulesMapper.insertSchedulesFromForm(formNo);
        if (result > 0) {
            log.info("설문 기반 일정 자동 생성 성공 - Form No: {}", formNo);
        }
        return result;
    }

    @Override
    public PageInfo<Schedules> page(QueryParams queryParams) throws Exception {
        // 페이지 시작 
        PageHelper.startPage(queryParams.getPage(), queryParams.getSize());
        Map<String, Object> params = new HashMap<>();
        params.put("queryParams", queryParams);
        // 검색 및 정렬 조건을 포함하여 데이터 조회
        return new PageInfo<>(schedulesMapper.listWithParams(params));
    }
    
}
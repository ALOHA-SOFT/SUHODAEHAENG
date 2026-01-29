package com.aloha.form.mapper;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.aloha.form.domain.Schedules;

@Mapper
public interface SchedulesMapper extends BaseMapper<Schedules> {
  
  // 일정 목록 조회
  List<Schedules> selectSchedulesList();
  
  // 특정 기간 일정 조회
  List<Schedules> selectSchedulesByDateRange(@Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);
  
  // 설문 기반 일정 조회
  List<Schedules> selectSchedulesByFormNo(Long formNo);
  
  // 설문 기반 일정 자동 생성
  int insertSchedulesFromForm(Long formNo);

  public List<Schedules> listWithParams(Map<String, Object> params);
  
}
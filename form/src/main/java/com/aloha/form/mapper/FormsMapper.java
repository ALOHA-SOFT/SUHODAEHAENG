package com.aloha.form.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.aloha.form.domain.Forms;

@Mapper
public interface FormsMapper extends BaseMapper<Forms> {
  
  // 설문 목록 조회
  List<Forms> selectFormsList();
  
  // 설문 상세 조회
  Forms selectFormsById(String id);

  List<Forms> listWithParams(Map<String, Object> params);
  
}
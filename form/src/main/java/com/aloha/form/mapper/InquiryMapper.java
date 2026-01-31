package com.aloha.form.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.aloha.form.domain.Inquiry;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;

@Mapper
public interface InquiryMapper extends BaseMapper<Inquiry> {

  List<Inquiry> listWithParams(Map<String, Object> params);
    
}

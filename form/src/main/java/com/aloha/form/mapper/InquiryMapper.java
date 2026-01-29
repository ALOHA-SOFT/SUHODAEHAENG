package com.aloha.form.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.aloha.form.domain.Inquiry;

@Mapper
public interface InquiryMapper extends BaseMapper<Inquiry> {
    
}

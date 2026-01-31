package com.aloha.form.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.aloha.form.domain.Notice;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;

@Mapper
public interface NoticeMapper extends BaseMapper<Notice> {

  List<Notice> listWithParams(Map<String, Object> params);
    
}

package com.aloha.form.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.aloha.form.domain.Notice;

@Mapper
public interface NoticeMapper extends BaseMapper<Notice> {
    
}

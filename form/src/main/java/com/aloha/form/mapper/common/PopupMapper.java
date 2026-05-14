package com.aloha.form.mapper.common;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.aloha.form.domain.common.Popups;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;

@Mapper
public interface PopupMapper extends BaseMapper<Popups> {

    public List<Popups> listWithParams(Map<String, Object> params);

}

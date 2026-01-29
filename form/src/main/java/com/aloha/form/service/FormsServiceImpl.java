package com.aloha.form.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.aloha.form.domain.Forms;
import com.aloha.form.domain.common.QueryParams;
import com.aloha.form.mapper.FormsMapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class FormsServiceImpl extends BaseServiceImpl<Forms, FormsMapper> implements FormsService {

    @Autowired
    private FormsMapper formsMapper;

    @Override
    public List<Forms> listByStatus(String status) throws Exception {
        QueryWrapper<Forms> queryWrapper = new QueryWrapper<>();
        
        // 상태가 null이거나 "전체"인 경우 전체 조회
        if (status == null || status.isEmpty() || "전체".equals(status)) {
            return formsMapper.selectList(null);
        }
        
        // 상태별 조회
        queryWrapper.eq("status", status);
        queryWrapper.orderByDesc("created_at");
        
        List<Forms> formsList = formsMapper.selectList(queryWrapper);
        log.info("상태별 설문 조회 - 상태: {}, 결과 수: {}", status, formsList.size());
        return formsList;
    }

    @Override
    public boolean insert(Forms forms) {
        // 기본 상태를 "접수"로 설정
        if (forms.getStatus() == null || forms.getStatus().isEmpty()) {
            forms.setStatus("접수");
        }
        
        int result = formsMapper.insert(forms);
        if (result > 0) {
            log.info("설문 등록 성공 - ID: {}, 상태: {}", forms.getId(), forms.getStatus());
        }
        return result > 0;
    }

    @Override
    public boolean update(Forms forms) {
        int result = formsMapper.updateById(forms);
        if (result > 0) {
            log.info("설문 수정 성공 - ID: {}, 상태: {}", forms.getId(), forms.getStatus());
        }
        return result > 0;
    }

    @Override
    public boolean delete(String id) {
        int result = formsMapper.deleteById(id);
        return result > 0;
    }

    @Override
    public Map<String, Integer> getStatusCount() throws Exception {
        Map<String, Integer> statusCount = new HashMap<>();
        
        // 전체 개수
        Long totalCount = formsMapper.selectCount(null);
        statusCount.put("전체", totalCount.intValue());
        
        // 상태별 개수 조회 (접수, 검토중, 승인, 반려, 완료)
        String[] statuses = {"접수", "검토중", "승인", "반려", "완료"};
        
        for (String status : statuses) {
            QueryWrapper<Forms> queryWrapper = new QueryWrapper<>();
            queryWrapper.eq("status", status);
            Long count = formsMapper.selectCount(queryWrapper);
            statusCount.put(status, count.intValue());
        }
        
        log.info("상태별 개수 조회 결과: {}", statusCount);
        return statusCount;
    }

    @Override
    public PageInfo<Forms> page(QueryParams queryParams) throws Exception {
        // 페이지 시작
        PageHelper.startPage(queryParams.getPage(), queryParams.getSize());
        Map<String, Object> params = new HashMap<>();
        params.put("queryParams", queryParams);
        return new PageInfo<>(formsMapper.listWithParams(params));
    }
    
    @Override
    public PageInfo<Forms> pageByStatus(QueryParams queryParams, String status) throws Exception {
        // 페이지 시작
        PageHelper.startPage(queryParams.getPage(), queryParams.getSize());
        Map<String, Object> params = new HashMap<>();
        params.put("queryParams", queryParams);
        params.put("status", status);
        return new PageInfo<>(formsMapper.listWithParams(params));
    }
    
}
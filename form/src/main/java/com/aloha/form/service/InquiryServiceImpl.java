package com.aloha.form.service;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.aloha.form.domain.Inquiry;
import com.aloha.form.domain.Notice;
import com.aloha.form.domain.common.QueryParams;
import com.aloha.form.mapper.InquiryMapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class InquiryServiceImpl extends BaseServiceImpl<Inquiry, InquiryMapper> implements InquiryService {

    @Autowired
    private InquiryMapper inquiryMapper;

    @Override
    public List<Inquiry> listByStatus(String status) throws Exception {
        QueryWrapper<Inquiry> queryWrapper = new QueryWrapper<>();
        
        // 상태가 null이거나 "전체"인 경우 전체 조회
        if (status == null || status.isEmpty() || "전체".equals(status)) {
            queryWrapper.orderByDesc("created_at");
            return inquiryMapper.selectList(queryWrapper);
        }
        
        // 상태별 조회
        queryWrapper.eq("status", status);
        queryWrapper.orderByDesc("created_at");
        
        List<Inquiry> inquiryList = inquiryMapper.selectList(queryWrapper);
        log.info("상태별 문의사항 조회 - 상태: {}, 결과 수: {}", status, inquiryList.size());
        return inquiryList;
    }

    @Override
    public boolean insert(Inquiry inquiry) {
        // 기본 상태를 "대기"로 설정
        if (inquiry.getStatus() == null || inquiry.getStatus().isEmpty()) {
            inquiry.setStatus("대기");
        }
        
        int result = inquiryMapper.insert(inquiry);
        if (result > 0) {
            log.info("문의사항 등록 성공 - ID: {}, 제목: {}", inquiry.getId(), inquiry.getTitle());
        }
        return result > 0;
    }

    @Override
    public boolean update(Inquiry inquiry) {
        int result = inquiryMapper.updateById(inquiry);
        if (result > 0) {
            log.info("문의사항 수정 성공 - ID: {}, 제목: {}", inquiry.getId(), inquiry.getTitle());
        }
        return result > 0;
    }

    @Override
    public boolean delete(String id) {
        int result = inquiryMapper.deleteById(id);
        return result > 0;
    }

    @Override
    public boolean reply(Inquiry inquiry) {
        Inquiry existingInquiry = selectById(inquiry.getId());
        if (existingInquiry != null) {
            existingInquiry.setReplyContent(inquiry.getReplyContent());
            existingInquiry.setReplyAt(new Date());
            existingInquiry.setStatus("답변완료");
            return updateById(existingInquiry);
        }
        return false;
    }

    @Override
    public PageInfo<Inquiry> page(QueryParams queryParams) throws Exception {
        // 페이지 시작
        PageHelper.startPage(queryParams.getPage(), queryParams.getSize());
        Map<String, Object> params = new HashMap<>();
        params.put("queryParams", queryParams);
        return new PageInfo<>(inquiryMapper.listWithParams(params));
    }
    
    @Override
    public PageInfo<Inquiry> pageByStatus(QueryParams queryParams, String status) throws Exception {
        // 페이지 시작
        PageHelper.startPage(queryParams.getPage(), queryParams.getSize());
        Map<String, Object> params = new HashMap<>();
        params.put("queryParams", queryParams);
        params.put("status", status);
        return new PageInfo<>(inquiryMapper.listWithParams(params));
    }
    
}

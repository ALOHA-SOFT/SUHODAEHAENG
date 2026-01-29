package com.aloha.form.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.aloha.form.domain.Notice;
import com.aloha.form.domain.common.QueryParams;
import com.aloha.form.mapper.NoticeMapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class NoticeServiceImpl extends BaseServiceImpl<Notice, NoticeMapper> implements NoticeService {

    @Autowired
    private NoticeMapper noticeMapper;

    @Override
    public List<Notice> listByStatus(String status) throws Exception {
        QueryWrapper<Notice> queryWrapper = new QueryWrapper<>();
        
        // 상태가 null이거나 "전체"인 경우 전체 조회
        if (status == null || status.isEmpty() || "전체".equals(status)) {
            queryWrapper.orderByDesc("created_at");
            return noticeMapper.selectList(queryWrapper);
        }
        
        // 상태별 조회
        queryWrapper.eq("status", status);
        queryWrapper.orderByDesc("created_at");
        
        List<Notice> noticeList = noticeMapper.selectList(queryWrapper);
        log.info("상태별 공지사항 조회 - 상태: {}, 결과 수: {}", status, noticeList.size());
        return noticeList;
    }

    @Override
    public boolean insert(Notice notice) {
        // 기본 상태를 "공개"로 설정
        if (notice.getStatus() == null || notice.getStatus().isEmpty()) {
            notice.setStatus("공개");
        }
        
        int result = noticeMapper.insert(notice);
        if (result > 0) {
            log.info("공지사항 등록 성공 - ID: {}, 제목: {}", notice.getId(), notice.getTitle());
        }
        return result > 0;
    }

    @Override
    public boolean update(Notice notice) {
        int result = noticeMapper.updateById(notice);
        if (result > 0) {
            log.info("공지사항 수정 성공 - ID: {}, 제목: {}", notice.getId(), notice.getTitle());
        }
        return result > 0;
    }

    @Override
    public boolean delete(String id) {
        int result = noticeMapper.deleteById(id);
        return result > 0;
    }

    @Override
    public PageInfo<Notice> page(QueryParams queryParams) throws Exception {
        // 페이지 시작
        PageHelper.startPage(queryParams.getPage(), queryParams.getSize());
        QueryWrapper<Notice> queryWrapper = new QueryWrapper<>();
        queryWrapper.orderByDesc("created_at");
        return new PageInfo<>(noticeMapper.selectList(queryWrapper));
    }
    
    @Override
    public PageInfo<Notice> pageByStatus(QueryParams queryParams, String status) throws Exception {
        // 페이지 시작
        PageHelper.startPage(queryParams.getPage(), queryParams.getSize());
        QueryWrapper<Notice> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("status", status);
        queryWrapper.orderByDesc("created_at");
        return new PageInfo<>(noticeMapper.selectList(queryWrapper));
    }
    
}

package com.aloha.form.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.util.UriComponentsBuilder;

import com.aloha.form.domain.Notice;
import com.aloha.form.domain.common.Pagination;
import com.aloha.form.domain.common.QueryParams;
import com.aloha.form.service.NoticeService;
import com.github.pagehelper.PageInfo;

import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
public class CustomerSupportController {
    
    @Autowired
    private NoticeService noticeService;
    
    /**
     * 💻 공지사항 목록 페이지
     */
    @GetMapping("/notices")
    public String notices(
        Model model, 
        QueryParams queryParams,
        Pagination pagination, 
        HttpServletRequest request
    ) {
        try {
            // 공개된 공지사항만 조회
            PageInfo<Notice> pageInfo = noticeService.pageByStatus(queryParams, "공개");
            
            model.addAttribute("pageInfo", pageInfo);

            // 페이지
            Long total = pageInfo.getTotal();
            pagination.setPage(queryParams.getPage());
            pagination.setSize(queryParams.getSize());
            pagination.setTotal(total);
            model.addAttribute("pagination", pagination);
            
            log.info("공지사항 목록 조회 - 결과 수: {}", pageInfo.getList().size());

            String path = request.getServletPath();
            String pageUri = UriComponentsBuilder.fromPath(path)
                                                .queryParam("search", queryParams.getSearch())
                                                .queryParam("size", pagination.getSize())
                                                .build()
                                                .toUriString();
            model.addAttribute("pageUri", pageUri);
            
        } catch (Exception e) {
            log.error("공지사항 목록 조회 오류", e);
        }
        return "page/company/notices";
    }
    
    /**
     * 💻 공지사항 상세 페이지
     */
    @GetMapping("/notices/{id}")
    public String noticeDetail(Model model, @PathVariable("id") String id) {
        try {
            Notice notice = noticeService.selectById(id);
            model.addAttribute("notice", notice);
            
        } catch (Exception e) {
            log.error("공지사항 상세 조회 오류", e);
        }
        return "page/company/notice_detail";
    }
    
    /**
     * 💻 문의하기 페이지
     */
    @GetMapping("/inquiry")
    public String inquiry(Model model) {
        log.info("문의하기 페이지 접근");
        return "page/company/inquiry";
    }
    
    /**
     * 💻 고객 후기 페이지
     */
    @GetMapping("/reviews")
    public String reviews(Model model) {
        log.info("고객 후기 페이지 접근");
        return "page/company/reviews";
    }
    
}

package com.aloha.form.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.util.UriComponentsBuilder;

import com.aloha.form.domain.Forms;
import com.aloha.form.domain.Inquiry;
import com.aloha.form.domain.Notice;
import com.aloha.form.domain.Schedules;
import com.aloha.form.domain.common.Pagination;
import com.aloha.form.domain.common.QueryParams;
import com.aloha.form.service.FormsService;
import com.aloha.form.service.InquiryService;
import com.aloha.form.service.NoticeService;
import com.aloha.form.service.SchedulesService;
import com.github.pagehelper.PageInfo;

import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequestMapping("/admin")
public class AdminController {

    @Autowired 
    private FormsService formsService;
    
    @Autowired 
    private SchedulesService schedulesService;
    
    @Autowired 
    private NoticeService noticeService;
    
    @Autowired 
    private InquiryService inquiryService;

    /**
     * 💻 관리자 메인 페이지
     * @return
     */
    @GetMapping("")
    public String index(Model model) {
        try {
            // 최근 설문 5개 조회
            List<Forms> recentForms = formsService.list();
            if (recentForms.size() > 5) {
                recentForms = recentForms.subList(0, 5);
            }
            model.addAttribute("recentForms", recentForms);
            
            // 최근 일정 5개 조회
            List<Schedules> recentSchedules = schedulesService.list();
            if (recentSchedules.size() > 5) {
                recentSchedules = recentSchedules.subList(0, 5);
            }
            model.addAttribute("recentSchedules", recentSchedules);
            
            // 상태별 개수 조회
            Map<String, Integer> statusCount = formsService.getStatusCount();
            model.addAttribute("statusCount", statusCount);
            
        } catch (Exception e) {
            log.error("관리자 메인 페이지 데이터 조회 오류", e);
        }
        return "page/admin/index";
    }

    /**
     * 💻 설문 관리 페이지
     * @param status 상태 필터 (접수, 검토중, 승인, 반려, 완료, 전체)
     * @return
     */
    @GetMapping("/forms")
    public String forms(
        Model model, 
        QueryParams queryParams,
        Pagination pagination, 
        HttpServletRequest request,
        @RequestParam(value = "status", required = false, defaultValue = "전체") String status
    ) {
        try {
            PageInfo<Forms> pageInfo;
            
            // 상태별 조회
            if ("전체".equals(status)) {
                pageInfo = formsService.page(queryParams);
            } else {
                pageInfo = formsService.pageByStatus(queryParams, status);
            }
            
            model.addAttribute("pageInfo", pageInfo);
            model.addAttribute("currentStatus", status);

            // 페이지
            Long total = pageInfo.getTotal();
            pagination.setPage(queryParams.getPage());
            pagination.setSize(queryParams.getSize());
            pagination.setTotal(total);
            model.addAttribute("pagination", pagination);
            
            // 상태별 개수 조회
            Map<String, Integer> statusCount = formsService.getStatusCount();
            model.addAttribute("statusCount", statusCount);
            
            log.info("설문 목록 조회 - 상태: {}, 결과 수: {}", status, pageInfo.getList().size());

            String path = request.getServletPath();
            String pageUri = UriComponentsBuilder.fromPath(path)
                                                .queryParam("search", queryParams.getSearch())
                                                .queryParam("size", pagination.getSize())
                                                .queryParam("status", status)
                                                .build()
                                                .toUriString();
            model.addAttribute("pageUri", pageUri);
            
        } catch (Exception e) {
            log.error("설문 목록 조회 오류", e);
        }
        return "page/admin/forms";
    }

    /**
     * 💻 설문 상세 조회 페이지
     * @return
     */
    @GetMapping("/forms/{id}")
    public String formDetail(Model model, @PathVariable("id") String id) {
        try {
            Forms forms = formsService.selectById(id);
            model.addAttribute("forms", forms);
            
            // 관련 일정 조회
            List<Schedules> schedules = schedulesService.listByFormNo(forms.getNo());
            model.addAttribute("schedules", schedules);
            
        } catch (Exception e) {
            log.error("설문 상세 조회 오류", e);
        }
        return "page/admin/form_detail";
    }

    /**
     * 💻 설문 수정 페이지
     * @return
     */
    @GetMapping("/forms/update/{id}")
    public String formUpdate(Model model, @PathVariable("id") String id) {
        try {
            Forms forms = formsService.selectById(id);
            model.addAttribute("forms", forms);
            
        } catch (Exception e) {
            log.error("설문 수정 페이지 조회 오류", e);
        }
        return "page/admin/forms_update";
    }

    /**
     * 💻 일정 관리 페이지 (스케줄 페이지와 동일)
     * @return
     */
    @GetMapping("/schedules")
    public String schedules(
        Model model, 
        QueryParams queryParams,
        Pagination pagination, 
        HttpServletRequest request
    ) {
        try {
            PageInfo<Schedules> pageInfo = schedulesService.page(queryParams);
            model.addAttribute("pageInfo", pageInfo);

            // 페이지
            Long total = pageInfo.getTotal();
            pagination.setPage(queryParams.getPage());
            pagination.setSize(queryParams.getSize());
            pagination.setTotal(total);
            model.addAttribute("pagination", pagination);
            
            String path = request.getServletPath();
            String pageUri = UriComponentsBuilder.fromPath(path)
                                                .queryParam("search", queryParams.getSearch())
                                                .queryParam("size", pagination.getSize())
                                                .build()
                                                .toUriString();
            model.addAttribute("pageUri", pageUri);
        } catch (Exception e) {
            log.error("일정 목록 조회 오류", e);
        }
        return "page/admin/schedules";
    }
    
    /**
     * 💻 캘린더
     * @return
     */
    @GetMapping("/calendar")
    public String calendar(
        Model model, 
        QueryParams queryParams,
        Pagination pagination, 
        HttpServletRequest request
    ) {
        // try {
        //     PageInfo<Schedules> pageInfo = schedulesService.page(queryParams);
        //     model.addAttribute("pageInfo", pageInfo);

        //     // 페이지
        //     Long total = pageInfo.getTotal();
        //     pagination.setPage(queryParams.getPage());
        //     pagination.setSize(queryParams.getSize());
        //     pagination.setTotal(total);
        //     model.addAttribute("pagination", pagination);
            
        //     String path = request.getServletPath();
        //     String pageUri = UriComponentsBuilder.fromPath(path)
        //                                         .queryParam("search", queryParams.getSearch())
        //                                         .queryParam("size", pagination.getSize())
        //                                         .build()
        //                                         .toUriString();
        //     model.addAttribute("pageUri", pageUri);
        // } catch (Exception e) {
        //     log.error("일정 목록 조회 오류", e);
        // }
        return "page/admin/calendar";
    }
    
    /**
     * 💻 공지사항 관리 페이지
     * @return
     */
    @GetMapping("/notices")
    public String notices(
        Model model, 
        QueryParams queryParams,
        Pagination pagination, 
        HttpServletRequest request,
        @RequestParam(value = "status", required = false, defaultValue = "전체") String status
    ) {
        try {
            PageInfo<Notice> pageInfo;
            
            // 상태별 조회
            if ("전체".equals(status)) {
                pageInfo = noticeService.page(queryParams);
            } else {
                pageInfo = noticeService.pageByStatus(queryParams, status);
            }
            
            model.addAttribute("pageInfo", pageInfo);
            model.addAttribute("currentStatus", status);

            // 페이지
            Long total = pageInfo.getTotal();
            pagination.setPage(queryParams.getPage());
            pagination.setSize(queryParams.getSize());
            pagination.setTotal(total);
            model.addAttribute("pagination", pagination);
            
            log.info("공지사항 목록 조회 - 상태: {}, 결과 수: {}", status, pageInfo.getList().size());

            String path = request.getServletPath();
            String pageUri = UriComponentsBuilder.fromPath(path)
                                                .queryParam("search", queryParams.getSearch())
                                                .queryParam("size", pagination.getSize())
                                                .queryParam("status", status)
                                                .build()
                                                .toUriString();
            model.addAttribute("pageUri", pageUri);
            
        } catch (Exception e) {
            log.error("공지사항 목록 조회 오류", e);
        }
        return "page/admin/notices";
    }

    /**
     * 💻 공지사항 상세 조회 페이지
     * @return
     */
    @GetMapping("/notices/{id}")
    public String noticeDetail(Model model, @PathVariable("id") String id) {
        try {
            Notice notice = noticeService.selectById(id);
            model.addAttribute("notice", notice);
            
        } catch (Exception e) {
            log.error("공지사항 상세 조회 오류", e);
        }
        return "page/admin/notice_detail";
    }

    /**
     * 💻 공지사항 작성 페이지
     * @return
     */
    @GetMapping("/notices/create")
    public String noticeCreate(Model model) {
        return "page/admin/notice_create";
    }

    /**
     * 💻 공지사항 수정 페이지
     * @return
     */
    @GetMapping("/notices/update/{id}")
    public String noticeUpdate(Model model, @PathVariable("id") String id) {
        try {
            Notice notice = noticeService.selectById(id);
            model.addAttribute("notice", notice);
            
        } catch (Exception e) {
            log.error("공지사항 수정 페이지 조회 오류", e);
        }
        return "page/admin/notice_update";
    }
    
    /**
     * 💻 문의사항 관리 페이지
     * @return
     */
    @GetMapping("/inquiries")
    public String inquiries(
        Model model, 
        QueryParams queryParams,
        Pagination pagination, 
        HttpServletRequest request,
        @RequestParam(value = "status", required = false, defaultValue = "전체") String status
    ) {
        try {
            PageInfo<Inquiry> pageInfo;
            
            // 상태별 조회
            if ("전체".equals(status)) {
                pageInfo = inquiryService.page(queryParams);
            } else {
                pageInfo = inquiryService.pageByStatus(queryParams, status);
            }
            
            model.addAttribute("pageInfo", pageInfo);
            model.addAttribute("currentStatus", status);

            // 페이지
            Long total = pageInfo.getTotal();
            pagination.setPage(queryParams.getPage());
            pagination.setSize(queryParams.getSize());
            pagination.setTotal(total);
            model.addAttribute("pagination", pagination);
            
            log.info("문의사항 목록 조회 - 상태: {}, 결과 수: {}", status, pageInfo.getList().size());

            String path = request.getServletPath();
            String pageUri = UriComponentsBuilder.fromPath(path)
                                                .queryParam("search", queryParams.getSearch())
                                                .queryParam("size", pagination.getSize())
                                                .queryParam("status", status)
                                                .build()
                                                .toUriString();
            model.addAttribute("pageUri", pageUri);
            
        } catch (Exception e) {
            log.error("문의사항 목록 조회 오류", e);
        }
        return "page/admin/inquiries";
    }

    /**
     * 💻 문의사항 상세 조회 페이지
     * @return
     */
    @GetMapping("/inquiries/{id}")
    public String inquiryDetail(Model model, @PathVariable("id") String id) {
        try {
            Inquiry inquiry = inquiryService.selectById(id);
            model.addAttribute("inquiry", inquiry);
            
        } catch (Exception e) {
            log.error("문의사항 상세 조회 오류", e);
        }
        return "page/admin/inquiry_detail";
    }

    /**
     * 💻 문의사항 답변 페이지
     * @return
     */
    @GetMapping("/inquiries/reply/{id}")
    public String inquiryReply(Model model, @PathVariable("id") String id) {
        try {
            Inquiry inquiry = inquiryService.selectById(id);
            model.addAttribute("inquiry", inquiry);
            
        } catch (Exception e) {
            log.error("문의사항 답변 페이지 조회 오류", e);
        }
        return "page/admin/inquiry_reply";
    }
    
}
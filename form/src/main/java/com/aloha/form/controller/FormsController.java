package com.aloha.form.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import com.aloha.form.domain.Forms;
import com.aloha.form.dto.FormParams;
import com.aloha.form.service.FormsService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequestMapping("/forms")
public class FormsController {

    @Autowired 
    private FormsService formsService;

    /**
     * 💻 설문 기초정보 작성 페이지
     * @return
     */
    @GetMapping("")
    public String index() {
        return "page/forms/index";
    }

    /**
     * 💻 설문 상세정보 작성 페이지
     * @return
     */
    @GetMapping("/detail")
    public String detail(
        Model model,
        FormParams formParams
    ) {
        log.info("formParams: {}", formParams);
        model.addAttribute("formParams", formParams);
        return "page/forms/detail";
    }

    /**
     * 💻 설문 작성 완료 페이지
     * @return
     */
    @GetMapping("/complete")
    public String complete() {
        return "page/forms/complete";
    }

    /**
     * 💻 설문 상세 조회 페이지 (관리자용)
     * @return
     */
    @GetMapping("/view/{id}")
    public String view(Model model, @PathVariable("id") String id) {
        try {
            Forms forms = formsService.selectById(id);
            model.addAttribute("forms", forms);
        } catch (Exception e) {
            log.error("설문 조회 오류", e);
        }
        return "page/forms/view";
    }
    
}
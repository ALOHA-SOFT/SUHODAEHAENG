package com.aloha.form.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
public class CompanyController {
    
    /**
     * 💻 메인 페이지
     */
    @GetMapping("/")
    public String index(Model model) {
        log.info("메인 페이지 접근");
        return "page/company/index";
    }
    
    /**
     * 💻 서비스 소개 페이지
     */
    @GetMapping("/services")
    public String services(Model model) {
        log.info("서비스 소개 페이지 접근");
        return "page/company/services";
    }
    
    /**
     * 💻 입주민 동의서 서비스 페이지
     */
    @GetMapping("/services/resident-consent")
    public String residentConsent(Model model) {
        log.info("입주민 동의서 서비스 페이지 접근");
        return "page/company/service_resident_consent";
    }
    
    /**
     * 💻 승강기 보양 서비스 페이지
     */
    @GetMapping("/services/elevator-protection")
    public String elevatorProtection(Model model) {
        log.info("승강기 보양 서비스 페이지 접근");
        return "page/company/service_elevator_protection";
    }
    
    /**
     * 💻 행위허가 서비스 페이지
     */
    @GetMapping("/services/permit")
    public String permit(Model model) {
        log.info("행위허가 서비스 페이지 접근");
        return "page/company/service_permit";
    }
    
    /**
     * 💻 방충망 시공 서비스 페이지
     */
    @GetMapping("/services/screen-installation")
    public String screenInstallation(Model model) {
        log.info("방충망 시공 서비스 페이지 접근");
        return "page/company/service_screen_installation";
    }
    
    /**
     * 💻 종합 청소 서비스 페이지
     */
    @GetMapping("/services/cleaning")
    public String cleaning(Model model) {
        log.info("종합 청소 서비스 페이지 접근");
        return "page/company/service_cleaning";
    }
    
}

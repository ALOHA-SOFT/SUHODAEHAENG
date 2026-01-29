package com.aloha.form.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.aloha.form.domain.Schedules;
import com.aloha.form.service.SchedulesService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequestMapping("/schedules")
public class SchedulesController {

    @Autowired 
    private SchedulesService schedulesService;

    /**
     * 💻 스케줄 관리 페이지
     * @return
     */
    @GetMapping("")
    public String index(Model model) {
        try {
            List<Schedules> schedulesList = schedulesService.list();
            model.addAttribute("schedulesList", schedulesList);
        } catch (Exception e) {
            log.error("스케줄 목록 조회 오류", e);
        }
        return "schedules/index";
    }
    
}
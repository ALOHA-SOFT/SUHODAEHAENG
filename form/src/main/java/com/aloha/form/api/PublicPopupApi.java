package com.aloha.form.api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.aloha.form.domain.common.Popups;
import com.aloha.form.service.common.PopupService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/popup")
public class PublicPopupApi {

    @Autowired
    private PopupService popupService;

    @GetMapping("/open")
    public ResponseEntity<?> getOpenPopups(
        @RequestParam(value = "type", required = false, defaultValue = "메인") String type
    ) {
        log.info("공개 팝업 조회 요청 - type: {}", type);
        try {
            List<Popups> popups = popupService.listByTypeOpen(type);
            log.info("공개 팝업 조회 성공 - count: {}", popups.size());
            return new ResponseEntity<>(popups, HttpStatus.OK);
        } catch (Exception e) {
            log.error("공개 팝업 조회 오류: {}", e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

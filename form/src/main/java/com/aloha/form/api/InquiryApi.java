package com.aloha.form.api;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.aloha.form.domain.Inquiry;
import com.aloha.form.service.InquiryService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/inquiries")
@CrossOrigin(origins = "*")
public class InquiryApi {
  
    @Autowired 
    private InquiryService inquiryService;
    
    /**
     * 📋 문의사항 목록 조회
     */
    @GetMapping()
    public ResponseEntity<?> getAll() {
        try {
            List<Inquiry> inquiryList = inquiryService.list();
            return new ResponseEntity<>(inquiryList, HttpStatus.OK);
        } catch (Exception e) {
            log.error("문의사항 목록 조회 오류", e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    /**
     * 📋 문의사항 상세 조회
     */
    @GetMapping("/{id}")
    public ResponseEntity<?> getOne(@PathVariable("id") String id) {
        try {
            Inquiry inquiry = inquiryService.selectById(id);
            return new ResponseEntity<>(inquiry, HttpStatus.OK);
        } catch (Exception e) {
            log.error("문의사항 상세 조회 오류", e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    /**
     * 📋 문의사항 등록
     */
    @PostMapping(path = "", consumes = "application/json")
    public ResponseEntity<?> create(@RequestBody Inquiry inquiry) {
        log.info("## 문의사항 등록 ##");
        log.info("inquiry={}", inquiry);
        
        try {
            boolean result = inquiryService.insert(inquiry);
            
            Map<String, Object> response = new HashMap<>();
            if (result) {
                response.put("success", true);
                response.put("message", "문의사항이 성공적으로 등록되었습니다.");
                response.put("inquiryId", inquiry.getId());
                return new ResponseEntity<>(response, HttpStatus.OK);
            } else {
                response.put("success", false);
                response.put("message", "문의사항 등록에 실패했습니다.");
                return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e) {
            log.error("문의사항 등록 오류", e);
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "서버 오류가 발생했습니다.");
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    /**
     * 📋 문의사항 수정
     */
    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable("id") String id, @RequestBody Inquiry inquiry) {
        log.info("## 문의사항 수정 ##");
        log.info("id={}, inquiry={}", id, inquiry);
        
        try {
            inquiry.setId(id);
            boolean result = inquiryService.updateById(inquiry);
            
            Map<String, Object> response = new HashMap<>();
            if (result) {
                response.put("success", true);
                response.put("message", "문의사항이 성공적으로 수정되었습니다.");
                return new ResponseEntity<>(response, HttpStatus.OK);
            } else {
                response.put("success", false);
                response.put("message", "문의사항 수정에 실패했습니다.");
                return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e) {
            log.error("문의사항 수정 오류", e);
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "서버 오류가 발생했습니다.");
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    /**
     * 📋 문의사항 답변
     */
    @PostMapping("/reply")
    public ResponseEntity<?> reply(Inquiry inquiry) {
        log.info("## 문의사항 답변 ##");
        log.info("inquiry={}", inquiry);
        
        try {
            boolean result = inquiryService.reply(inquiry);
            
            Map<String, Object> response = new HashMap<>();
            if (result) {
                response.put("success", true);
                response.put("message", "답변이 성공적으로 등록되었습니다.");
                return new ResponseEntity<>(response, HttpStatus.OK);
            } else {
                response.put("success", false);
                response.put("message", "답변 등록에 실패했습니다.");
                return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e) {
            e.printStackTrace();
            log.error("답변 등록 오류", e);
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "서버 오류가 발생했습니다.");
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    /**
     * 📋 문의사항 삭제
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<?> destroy(@PathVariable("id") String id) {
        try {
            boolean result = inquiryService.deleteById(id);
            Map<String, Object> response = new HashMap<>();
            
            if (result) {
                response.put("success", true);
                response.put("message", "문의사항이 성공적으로 삭제되었습니다.");
                return new ResponseEntity<>(response, HttpStatus.OK);
            } else {
                response.put("success", false);
                response.put("message", "문의사항 삭제에 실패했습니다.");
                return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e) {
            log.error("문의사항 삭제 오류", e);
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "서버 오류가 발생했습니다.");
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
}

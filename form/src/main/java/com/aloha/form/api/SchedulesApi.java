package com.aloha.form.api;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.aloha.form.domain.Schedules;
import com.aloha.form.service.SchedulesService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/schedules")
public class SchedulesApi {
  
    @Autowired 
    private SchedulesService schedulesService;
    
    /**
     * 📅 일정 목록 조회
     */
    @GetMapping()
    public ResponseEntity<?> getAll() {
        try {
            List<Schedules> schedulesList = schedulesService.list();
            return new ResponseEntity<>(schedulesList, HttpStatus.OK);
        } catch (Exception e) {
            log.error("일정 목록 조회 오류", e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    /**
     * 📅 특정 기간 일정 조회 (FullCalendar용)
     */
    @GetMapping("/calendar")
    public ResponseEntity<?> getCalendarEvents(
        @RequestParam("start") String startStr,
        @RequestParam("end") String endStr
    ) {
        try {
            // ISO DateTime 또는 Date 형식을 LocalDate로 변환
            LocalDate startDate = parseToLocalDate(startStr);
            LocalDate endDate = parseToLocalDate(endStr);
            
            log.info("📅 캘린더 일정 조회 요청: {} ~ {}", startDate, endDate);
            
            List<Schedules> schedulesList = schedulesService.listByDateRange(startDate, endDate);
            
            // FullCalendar 형식으로 변환 (LocalDate는 자동으로 yyyy-MM-dd 형식으로 변환됨)
            List<Map<String, Object>> events = schedulesList.stream().map(schedule -> {
                Map<String, Object> event = new HashMap<>();
                event.put("id", schedule.getId());
                event.put("title", schedule.getTitle());
                event.put("start", schedule.getStart().toString()); // LocalDate.toString()은 yyyy-MM-dd 형식
                event.put("end", schedule.getEnd().toString());
                event.put("color", schedule.getColor());
                event.put("extendedProps", Map.of(
                    "formNo", schedule.getFormNo() != null ? schedule.getFormNo() : 0L,
                    "note", schedule.getNote() != null ? schedule.getNote() : ""
                ));
                event.put("form", schedule.getForm() != null ? schedule.getForm() : "");
                return event;
            }).toList();
            
            log.info("📅 조회된 일정 개수: {}", events.size());
            return new ResponseEntity<>(events, HttpStatus.OK);
        } catch (Exception e) {
            log.error("캘린더 일정 조회 오류", e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    /**
     * 📅 ISO DateTime 또는 Date 문자열을 LocalDate로 변환
     */
    private LocalDate parseToLocalDate(String dateStr) {
        if (dateStr == null || dateStr.isEmpty()) {
            return LocalDate.now();
        }
        
        // ISO DateTime 형식인 경우 (예: 2025-10-26T00:00:00+09:00)
        if (dateStr.contains("T")) {
            return LocalDate.parse(dateStr.substring(0, 10));
        }
        
        // 날짜만 있는 경우 (예: 2025-10-26)
        return LocalDate.parse(dateStr);
    }
    
    /**
     * 📅 일정 상세 조회
     */
    @GetMapping("/{id}")
    public ResponseEntity<?> getOne(@PathVariable("id") String id) {
        try {
            Schedules schedule = schedulesService.selectById(id);
            return new ResponseEntity<>(schedule, HttpStatus.OK);
        } catch (Exception e) {
            log.error("일정 상세 조회 오류", e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    /**
     * 📅 일정 등록 (JSON)
     */
    @PostMapping(path = "", consumes = "application/json")
    public ResponseEntity<?> create(@RequestBody Schedules schedule) {
        log.info("## JSON 일정 등록 ##");
        log.info("schedule={}", schedule);
        
        try {
            boolean result = schedulesService.insert(schedule);
            
            Map<String, Object> response = new HashMap<>();
            if (result) {
                response.put("success", true);
                response.put("message", "일정이 성공적으로 등록되었습니다.");
                response.put("scheduleId", schedule.getId());
                return new ResponseEntity<>(response, HttpStatus.OK);
            } else {
                response.put("success", false);
                response.put("message", "일정 등록에 실패했습니다.");
                return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e) {
            log.error("일정 등록 오류", e);
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "서버 오류가 발생했습니다.");
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    /**
     * 📅 일정 수정 (JSON)
     */
    @PutMapping(path = "", consumes = "application/json")
    public ResponseEntity<?> update(@RequestBody Schedules schedule) {
        try {
            boolean result = schedulesService.updateById(schedule);
            Map<String, Object> response = new HashMap<>();
            
            if (result) {
                response.put("success", true);
                response.put("message", "일정이 성공적으로 수정되었습니다.");
                return new ResponseEntity<>(response, HttpStatus.OK);
            } else {
                response.put("success", false);
                response.put("message", "일정 수정에 실패했습니다.");
                return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e) {
            log.error("일정 수정 오류", e);
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "서버 오류가 발생했습니다.");
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    /**
     * 📅 일정 삭제
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<?> destroy(@PathVariable("id") String id) {
        try {
            boolean result = schedulesService.deleteById(id);
            Map<String, Object> response = new HashMap<>();
            
            if (result) {
                response.put("success", true);
                response.put("message", "일정이 성공적으로 삭제되었습니다.");
                return new ResponseEntity<>(response, HttpStatus.OK);
            } else {
                response.put("success", false);
                response.put("message", "일정 삭제에 실패했습니다.");
                return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e) {
            log.error("일정 삭제 오류", e);
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "서버 오류가 발생했습니다.");
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    /**
     * 📅 설문 기반 자동 일정 생성
     */
    @PostMapping("/create-from-form/{formNo}")
    public ResponseEntity<?> createFromForm(@PathVariable("formNo") Long formNo) {
        try {
            int result = schedulesService.createFromForm(formNo);
            Map<String, Object> response = new HashMap<>();
            
            if (result > 0) {
                response.put("success", true);
                response.put("message", "설문 기반 일정이 성공적으로 생성되었습니다.");
                return new ResponseEntity<>(response, HttpStatus.OK);
            } else {
                response.put("success", false);
                response.put("message", "일정 생성에 실패했습니다.");
                return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e) {
            log.error("설문 기반 일정 생성 오류", e);
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "서버 오류가 발생했습니다.");
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
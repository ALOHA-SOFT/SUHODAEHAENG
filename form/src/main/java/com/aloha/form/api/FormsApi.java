package com.aloha.form.api;

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

import com.aloha.form.domain.Forms;
import com.aloha.form.service.FormsService;
import com.aloha.form.service.SchedulesService;
import com.aloha.form.service.EmailService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/forms")
public class FormsApi {
  
    @Autowired 
    private FormsService formsService;
    
    @Autowired 
    private SchedulesService schedulesService;
    
    @Autowired 
    private EmailService emailService;
    
    /**
     * 📋 설문 목록 조회
     */
    @GetMapping()
    public ResponseEntity<?> getAll() {
        try {
            List<Forms> formsList = formsService.list();
            return new ResponseEntity<>(formsList, HttpStatus.OK);
        } catch (Exception e) {
            log.error("설문 목록 조회 오류", e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    /**
     * 📋 설문 상세 조회
     */
    @GetMapping("/{id}")
    public ResponseEntity<?> getOne(@PathVariable("id") String id) {
        try {
            Forms forms = formsService.selectById(id);
            return new ResponseEntity<>(forms, HttpStatus.OK);
        } catch (Exception e) {
            log.error("설문 상세 조회 오류", e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    /**
     * 📋 설문 등록 (폼 데이터)
     */
    @PostMapping(path = "", consumes = "application/x-www-form-urlencoded")
    public ResponseEntity<?> createForm(Forms forms, 
                                      @RequestParam(value = "firstServices", required = false) String firstServices) {
        log.info("## FORM 설문 등록 ##");
        log.info("forms={}", forms);
        log.info("firstServices={}", firstServices);
        
        try {
            // 다중 선택된 첫 번째 서비스를 단일 문자열로 처리
            if (firstServices != null && !firstServices.trim().isEmpty()) {
                forms.setFirstService(firstServices); // 콤마로 구분된 문자열로 저장
                log.info("다중 선택 서비스1 처리: {}", firstServices);
            }
            
            boolean result = formsService.insert(forms);
            
            Map<String, Object> response = new HashMap<>();
            if (result) {
                // 설문 등록 성공 시 자동으로 스케줄 생성
                try {
                    schedulesService.createFromForm(forms.getNo());
                    log.info("자동 스케줄 생성 완료");
                } catch (Exception e) {
                    log.warn("자동 스케줄 생성 실패", e);
                }
                
                // 이메일 발송
                try {
                    // 사용자에게 완료 이메일 발송
                    emailService.sendFormCompletionEmail(forms);
                    // 관리자에게 알림 이메일 발송
                    emailService.sendFormNotificationEmailToAdmin(forms);
                    log.info("이메일 발송 완료");
                } catch (Exception e) {
                    log.warn("이메일 발송 실패", e);
                }
                
                response.put("success", true);
                response.put("message", "설문이 성공적으로 등록되었습니다.");
                response.put("formId", forms.getId());
                return new ResponseEntity<>(response, HttpStatus.OK);
            } else {
                response.put("success", false);
                response.put("message", "설문 등록에 실패했습니다.");
                return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e) {
            log.error("설문 등록 오류", e);
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "서버 오류가 발생했습니다.");
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    /**
     * 📋 설문 등록 (폼 데이터)
     */
    @PostMapping(path = "", consumes = "multipart/form-data")
    public ResponseEntity<?> createMultipartForm(Forms forms, 
                                      @RequestParam(value = "firstServices", required = false) String firstServices) {
        log.info("## FORM 설문 등록 ##");
        log.info("forms={}", forms);
        log.info("firstServices={}", firstServices);
        
        try {
            // 다중 선택된 첫 번째 서비스를 단일 문자열로 처리
            if (firstServices != null && !firstServices.trim().isEmpty()) {
                forms.setFirstService(firstServices); // 콤마로 구분된 문자열로 저장
                log.info("다중 선택 서비스1 처리: {}", firstServices);
            }
            
            boolean result = formsService.insert(forms);
            
            Map<String, Object> response = new HashMap<>();
            if (result) {
                // 설문 등록 성공 시 자동으로 스케줄 생성
                try {
                    schedulesService.createFromForm(forms.getNo());
                    log.info("자동 스케줄 생성 완료");
                } catch (Exception e) {
                    log.warn("자동 스케줄 생성 실패", e);
                }
                
                // 이메일 발송
                try {
                    // 사용자에게 완료 이메일 발송
                    emailService.sendFormCompletionEmail(forms);
                    // 관리자에게 알림 이메일 발송
                    emailService.sendFormNotificationEmailToAdmin(forms);
                    log.info("이메일 발송 완료");
                } catch (Exception e) {
                    log.warn("이메일 발송 실패", e);
                }
                
                response.put("success", true);
                response.put("message", "설문이 성공적으로 등록되었습니다.");
                response.put("formId", forms.getId());
                return new ResponseEntity<>(response, HttpStatus.OK);
            } else {
                response.put("success", false);
                response.put("message", "설문 등록에 실패했습니다.");
                return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e) {
            log.error("설문 등록 오류", e);
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "서버 오류가 발생했습니다.");
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * 📋 설문 등록 (JSON)
     */
    @PostMapping(path = "", consumes = "application/json")
    public ResponseEntity<?> create(@RequestBody Forms forms) {
        log.info("## JSON 설문 등록 ##");
        log.info("forms={}", forms);
        
        try {
            boolean result = formsService.insert(forms);
            
            Map<String, Object> response = new HashMap<>();
            if (result) {
                // 설문 등록 성공 시 자동으로 스케줄 생성
                try {
                    schedulesService.createFromForm(forms.getNo());
                    log.info("자동 스케줄 생성 완료");
                } catch (Exception e) {
                    log.warn("자동 스케줄 생성 실패", e);
                }
                
                // 이메일 발송
                try {
                    // 사용자에게 완료 이메일 발송
                    emailService.sendFormCompletionEmail(forms);
                    // 관리자에게 알림 이메일 발송
                    emailService.sendFormNotificationEmailToAdmin(forms);
                    log.info("이메일 발송 완료");
                } catch (Exception e) {
                    log.warn("이메일 발송 실패", e);
                }
                
                response.put("success", true);
                response.put("message", "설문이 성공적으로 등록되었습니다.");
                response.put("formId", forms.getId());
                return new ResponseEntity<>(response, HttpStatus.OK);
            } else {
                response.put("success", false);
                response.put("message", "설문 등록에 실패했습니다.");
                return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e) {
            log.error("설문 등록 오류", e);
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "서버 오류가 발생했습니다.");
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    /**
     * 📋 설문 수정 (폼 데이터)
     */
    @PutMapping(path = "", consumes = "application/x-www-form-urlencoded")
    public ResponseEntity<?> updateForm(Forms forms) {
        try {
            boolean result = formsService.update(forms);
            Map<String, Object> response = new HashMap<>();
            
            if (result) {
                response.put("success", true);
                response.put("message", "설문이 성공적으로 수정되었습니다.");
                return new ResponseEntity<>(response, HttpStatus.OK);
            } else {
                response.put("success", false);
                response.put("message", "설문 수정에 실패했습니다.");
                return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e) {
            log.error("설문 수정 오류", e);
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "서버 오류가 발생했습니다.");
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    /**
     * 📋 설문 수정 (JSON)
     */
    @PutMapping(path = "", consumes = "application/json")
    public ResponseEntity<?> update(@RequestBody Forms forms) {
        try {
            boolean result = formsService.update(forms);
            Map<String, Object> response = new HashMap<>();
            
            if (result) {
                response.put("success", true);
                response.put("message", "설문이 성공적으로 수정되었습니다.");
                return new ResponseEntity<>(response, HttpStatus.OK);
            } else {
                response.put("success", false);
                response.put("message", "설문 수정에 실패했습니다.");
                return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e) {
            log.error("설문 수정 오류", e);
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "서버 오류가 발생했습니다.");
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    /**
     * 📋 설문 삭제
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<?> destroy(@PathVariable("id") String id) {
        try {
            boolean result = formsService.deleteById(id);
            Map<String, Object> response = new HashMap<>();
            
            if (result) {
                response.put("success", true);
                response.put("message", "설문이 성공적으로 삭제되었습니다.");
                return new ResponseEntity<>(response, HttpStatus.OK);
            } else {
                response.put("success", false);
                response.put("message", "설문 삭제에 실패했습니다.");
                return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e) {
            log.error("설문 삭제 오류", e);
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "서버 오류가 발생했습니다.");
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * 📋 설문 일괄 삭제
     */
    @DeleteMapping("/batch")
    public ResponseEntity<?> batchDelete(@RequestBody Map<String, String> request) {
        try {
            String ids = request.get("ids");
            log.info("Batch delete IDs: {}", ids);
            if (ids == null || ids.isEmpty()) {
                Map<String, Object> response = new HashMap<>();
                response.put("success", false);
                response.put("message", "삭제할 항목을 선택해주세요.");
                return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
            }
            
            int deletedCount = 0;
            String[] idArray = ids.split(",");
            for (String id : idArray) {
                boolean result = formsService.delete(id);
                if (result) {
                    deletedCount++;
                }
            }
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", deletedCount + "개의 설문이 삭제되었습니다.");
            response.put("deletedCount", deletedCount);
            return new ResponseEntity<>(response, HttpStatus.OK);
            
        } catch (Exception e) {
            log.error("설문 일괄 삭제 오류", e);
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "서버 오류가 발생했습니다.");
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * 📋 설문 상태 일괄 변경
     */
    @PutMapping("/batch/status")
    public ResponseEntity<?> batchUpdateStatus(@RequestBody Map<String, Object> request) {
        try {
            @SuppressWarnings("unchecked")
            List<String> ids = (List<String>) request.get("ids");
            String status = (String) request.get("status");
            
            if (ids == null || ids.isEmpty()) {
                Map<String, Object> response = new HashMap<>();
                response.put("success", false);
                response.put("message", "변경할 항목을 선택해주세요.");
                return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
            }
            
            if (status == null || status.isEmpty()) {
                Map<String, Object> response = new HashMap<>();
                response.put("success", false);
                response.put("message", "변경할 상태를 선택해주세요.");
                return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
            }
            
            int updatedCount = 0;
            for (String id : ids) {
                Forms forms = formsService.selectById(id);
                if (forms != null) {
                    forms.setStatus(status);
                    boolean result = formsService.update(forms);
                    if (result) {
                        updatedCount++;
                    }
                }
            }
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", updatedCount + "개의 설문 상태가 변경되었습니다.");
            response.put("updatedCount", updatedCount);
            return new ResponseEntity<>(response, HttpStatus.OK);
            
        } catch (Exception e) {
            log.error("설문 상태 일괄 변경 오류", e);
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "서버 오류가 발생했습니다.");
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * 📋 설문 승인 처리
     */
    @PutMapping("/{id}/approve")
    public ResponseEntity<?> approve(@PathVariable("id") String id) {
        log.info("## 설문 승인 처리 ##");
        log.info("id={}", id);
        
        try {
            Forms forms = formsService.selectById(id);
            if (forms == null) {
                Map<String, Object> response = new HashMap<>();
                response.put("success", false);
                response.put("message", "설문을 찾을 수 없습니다.");
                return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
            }
            
            // 상태를 승인으로 변경
            forms.setStatus("승인");
            boolean result = formsService.update(forms);
            
            Map<String, Object> response = new HashMap<>();
            if (result) {
                // 승인 알림 이메일 발송 (추후 구현)
                // try {
                //     emailService.sendFormApprovalEmail(forms);
                //     log.info("승인 이메일 발송 완료");
                // } catch (Exception e) {
                //     log.warn("승인 이메일 발송 실패", e);
                // }
                
                response.put("success", true);
                response.put("message", "설문이 성공적으로 승인되었습니다.");
                return new ResponseEntity<>(response, HttpStatus.OK);
            } else {
                response.put("success", false);
                response.put("message", "설문 승인에 실패했습니다.");
                return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e) {
            log.error("설문 승인 처리 오류", e);
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "서버 오류가 발생했습니다.");
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
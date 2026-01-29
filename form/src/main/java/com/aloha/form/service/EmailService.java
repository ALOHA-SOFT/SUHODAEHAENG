package com.aloha.form.service;

import com.aloha.form.domain.Forms;

public interface EmailService {
    
    /**
     * 설문 작성 완료 이메일 발송 (사용자용)
     * @param forms 설문 정보
     * @return 발송 성공 여부
     */
    boolean sendFormCompletionEmail(Forms forms);
    
    /**
     * 설문 작성 알림 이메일 발송 (관리자용)
     * @param forms 설문 정보
     * @return 발송 성공 여부
     */
    boolean sendFormNotificationEmailToAdmin(Forms forms);
    
}
package com.aloha.form.service;

import java.text.SimpleDateFormat;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import com.aloha.form.domain.Forms;

import jakarta.mail.internet.MimeMessage;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class EmailServiceImpl implements EmailService {

    @Autowired
    private JavaMailSender mailSender;
    
    @Autowired
    private TemplateEngine templateEngine;
    
    @Value("${spring.mail.username:admin@수호대행.com}")
    private String fromEmail;
    
    @Value("${app.admin.email:admin@수호대행.com}")
    private String adminEmail;

    @Override
    public boolean sendFormCompletionEmail(Forms forms) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            
            // 수신자 설정
            // helper.setTo(forms.getEmail());
            helper.setFrom(fromEmail);
            helper.setSubject("[수호대행] 설문 작성이 완료되었습니다");
            
            // 템플릿 컨텍스트 설정
            Context context = new Context();
            context.setVariable("forms", forms);
            context.setVariable("formattedDate", formatDate(forms.getCreatedAt()));
            context.setVariable("firstServiceText", getFirstServiceText(forms.getFirstService()));
            context.setVariable("secondServiceText", getSecondServiceText(forms.getSecondService()));
            
            // HTML 템플릿 렌더링
            String htmlContent = templateEngine.process("email/form_record", context);
            helper.setText(htmlContent, true);
            
            // 이메일 발송
            mailSender.send(message);
            // log.info("설문 완료 이메일 발송 성공 - 수신자: {}", forms.getEmail());
            return true;
            
        } catch (Exception e) {
            // log.error("설문 완료 이메일 발송 실패 - 수신자: {}, 오류: {}", forms.getEmail(), e.getMessage());
            return false;
        }
    }

    @Override
    public boolean sendFormNotificationEmailToAdmin(Forms forms) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            
            // 수신자 설정
            helper.setTo(adminEmail);
            helper.setFrom(fromEmail);
            helper.setSubject("[수호대행] 새로운 설문이 접수되었습니다");
            
            // 템플릿 컨텍스트 설정
            Context context = new Context();
            context.setVariable("forms", forms);
            context.setVariable("formattedDate", formatDate(forms.getCreatedAt()));
            context.setVariable("firstServiceText", getFirstServiceText(forms.getFirstService()));
            context.setVariable("secondServiceText", getSecondServiceText(forms.getSecondService()));
            
            // HTML 템플릿 렌더링
            String htmlContent = templateEngine.process("email/form_record_admin", context);
            helper.setText(htmlContent, true);
            
            // 이메일 발송
            mailSender.send(message);
            log.info("관리자 알림 이메일 발송 성공 - 수신자: {}", adminEmail);
            return true;
            
        } catch (Exception e) {
            log.error("관리자 알림 이메일 발송 실패 - 수신자: {}, 오류: {}", adminEmail, e.getMessage());
            return false;
        }
    }
    
    /**
     * 날짜 포맷팅
     */
    private String formatDate(java.util.Date date) {
        if (date == null) return "";
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy년 MM월 dd일 HH:mm");
        return sdf.format(date);
    }
    
    /**
     * 첫번째 서비스 텍스트 변환
     */
    private String getFirstServiceText(String firstService) {
        if (firstService == null) return "";
        switch (firstService) {
            case "1": return "입주민 동의서";
            case "2": return "승강기 기타 보양";
            case "3": return "행위허가";
            default: return firstService;
        }
    }
    
    /**
     * 두번째 서비스 텍스트 변환
     */
    private String getSecondServiceText(String secondService) {
        if (secondService == null) return "";
        switch (secondService) {
            case "1": return "방충망 시공";
            case "2": return "종합 청소";
            default: return secondService;
        }
    }
    
    
}
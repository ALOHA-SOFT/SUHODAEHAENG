package com.aloha.form.domain;

import java.util.Date;
import java.util.UUID;

import org.apache.ibatis.type.Alias;
import org.springframework.format.annotation.DateTimeFormat;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;

import groovy.transform.builder.Builder;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
// @NoArgsConstructor
@AllArgsConstructor
@TableName("inquiries")
@Alias("Inquiry")
@Builder
public class Inquiry extends Base {

    @TableId(type = IdType.AUTO)        
    private Long no;                    // PK
    private String id = UUID.randomUUID().toString();                  // UK
    private String name;                // 문의자명
    private String email;               // 이메일
    private String phone;               // 전화번호
    private String title;               // 제목
    private String content;             // 문의 내용
    private String status;              // 상태 (대기/답변완료)
    private String replyContent;        // 답변 내용
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date replyAt;               // 답변 일시
    
    public Inquiry() {
        this.id = UUID.randomUUID().toString();
    }

}

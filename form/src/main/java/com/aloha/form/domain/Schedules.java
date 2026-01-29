package com.aloha.form.domain;

import java.time.LocalDate;

import org.apache.ibatis.type.Alias;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableName;
import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@TableName("schedules")
@Alias("Schedules")
public class Schedules extends Base {

    private Long formNo;                // FK (forms.no)
    private String title;               // 일정 제목 (ex. 방충망 시공, 종합 청소)
    private String note;                // 일정 내용
    
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate start;            // 시작일
    
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate end;              // 종료일
    
    private String color;               // 캘린더 색상

    @TableField(exist = false)
    private Forms form;

}
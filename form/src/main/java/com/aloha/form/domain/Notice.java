package com.aloha.form.domain;

import org.apache.ibatis.type.Alias;

import com.baomidou.mybatisplus.annotation.TableName;

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
@TableName("notices")
@Alias("Notice")
public class Notice extends Base {
    
    private String title;               // 공지 제목
    private String content;             // 공지 내용
    private String author;              // 작성자
    private String status;              // 공개상태 (공개/비공개)
    
}

package com.a_hub.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class NoticeDto {
    private String seq;
    private String url;
    private String content;
    private String imagePath;
    private String contact;
    private String department;
    private LocalDate postDate;
    private LocalDate registerDate;
    private float[] vector;
}

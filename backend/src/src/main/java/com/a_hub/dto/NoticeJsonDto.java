package com.a_hub.dto;

import lombok.Data;

@Data
public class NoticeJsonDto {
    private String seq;
    private String url;
    private boolean has_image;
    private String image_path;
    private String text;
    private String contact;
    private String department;
    private String date; // "2025-09-22(등록일 : 2025-02-28)"
}

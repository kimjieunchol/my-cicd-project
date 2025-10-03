package com.a_hub.dto;

import lombok.Data;

@Data
public class ChatRequestDto {
    private String question;  // 사용자 질문
    private Integer topK;     // 벡터 검색으로 참고할 공지 개수
}

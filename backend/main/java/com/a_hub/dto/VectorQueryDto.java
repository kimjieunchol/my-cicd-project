package com.a_hub.dto;

import lombok.Data;

@Data
public class VectorQueryDto {
    private float[] queryVector;  // 검색용 벡터
    private Integer topK;         // 검색할 결과 개수
}

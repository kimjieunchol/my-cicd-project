package com.a_hub.service;

import com.theokanning.openai.embedding.Embedding;
import com.theokanning.openai.embedding.EmbeddingRequest;
import com.theokanning.openai.embedding.EmbeddingResult;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Slf4j
@Service
public class OpenAIEmbeddingService {

    private final com.theokanning.openai.OpenAiService openAiService;
    
    @Value("${openai.embedding-model:text-embedding-3-small}")
    private String embeddingModel;

    public OpenAIEmbeddingService(@Value("${openai.api-key}") String apiKey) {
        this.openAiService = new com.theokanning.openai.OpenAiService(apiKey);
    }

    /**
     * 텍스트를 임베딩 벡터로 변환
     * @param text 변환할 텍스트
     * @return float[] 임베딩 벡터 (1536차원)
     */
    public float[] getEmbedding(String text) {
        try {
            if (text == null || text.trim().isEmpty()) {
                log.warn("Empty text provided for embedding");
                return new float[1536]; // 빈 벡터 반환
            }

            // 텍스트가 너무 길면 잘라내기 (OpenAI 토큰 제한)
            String processedText = text.length() > 8000 
                ? text.substring(0, 8000) 
                : text;

            EmbeddingRequest request = EmbeddingRequest.builder()
                    .model(embeddingModel)
                    .input(Collections.singletonList(processedText))
                    .build();

            EmbeddingResult result = openAiService.createEmbeddings(request);

            if (result.getData() != null && !result.getData().isEmpty()) {
                Embedding embedding = result.getData().get(0);
                List<Double> embeddingList = embedding.getEmbedding();
                
                // Double[] → float[] 변환
                float[] floatArray = new float[embeddingList.size()];
                for (int i = 0; i < embeddingList.size(); i++) {
                    floatArray[i] = embeddingList.get(i).floatValue();
                }
                
                log.debug("Generated embedding vector of size: {}", floatArray.length);
                return floatArray;
            }

            log.error("No embedding data returned from OpenAI");
            throw new RuntimeException("임베딩 생성 실패");

        } catch (Exception e) {
            log.error("Error creating embedding: {}", e.getMessage(), e);
            throw new RuntimeException("임베딩 생성 중 오류 발생: " + e.getMessage(), e);
        }
    }

    /**
     * 여러 텍스트를 한번에 임베딩
     * @param texts 텍스트 리스트
     * @return List<float[]> 임베딩 벡터 리스트
     */
    public List<float[]> getEmbeddings(List<String> texts) {
        try {
            if (texts == null || texts.isEmpty()) {
                return Collections.emptyList();
            }

            // 각 텍스트를 개별적으로 임베딩 (안정성)
            return texts.stream()
                    .map(this::getEmbedding)
                    .toList();

        } catch (Exception e) {
            log.error("Error creating embeddings: {}", e.getMessage(), e);
            throw new RuntimeException("다중 임베딩 생성 실패: " + e.getMessage(), e);
        }
    }

    /**
     * 임베딩 차원 수 반환
     */
    public int getEmbeddingDimension() {
        // text-embedding-3-small은 1536차원
        return 1536;
    }
}
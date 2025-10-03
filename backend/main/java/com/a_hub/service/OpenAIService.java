package com.a_hub.service;

import com.theokanning.openai.completion.chat.ChatCompletionRequest;
import com.theokanning.openai.completion.chat.ChatCompletionResult;
import com.theokanning.openai.completion.chat.ChatMessage;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Slf4j
@Service
public class OpenAIService {

    private final com.theokanning.openai.OpenAiService openAiService;
    
    @Value("${openai.model:gpt-3.5-turbo}")
    private String model;

    public OpenAIService(@Value("${openai.api-key}") String apiKey) {
        this.openAiService = new com.theokanning.openai.OpenAiService(apiKey);
    }

    /**
     * 챗봇 대화 - 단일 메시지 전송
     */
    public String chat(String userMessage) {
        try {
            ChatMessage message = new ChatMessage("user", userMessage);
            
            ChatCompletionRequest request = ChatCompletionRequest.builder()
                    .model(model)
                    .messages(Collections.singletonList(message))
                    .temperature(0.7)
                    .maxTokens(1000)
                    .build();
            
            ChatCompletionResult result = openAiService.createChatCompletion(request);
            
            if (result.getChoices() != null && !result.getChoices().isEmpty()) {
                return result.getChoices().get(0).getMessage().getContent();
            }
            
            return "응답을 생성할 수 없습니다.";
            
        } catch (Exception e) {
            log.error("Error calling OpenAI chat API: {}", e.getMessage(), e);
            throw new RuntimeException("OpenAI API 호출 실패: " + e.getMessage(), e);
        }
    }
    
    /**
     * GPT에게 질문 (chat 메서드의 별칭)
     */
    public String askGPT(String prompt) {
        return chat(prompt);
    }
    
    /**
     * 대화 히스토리를 포함한 챗봇 대화
     */
    public String chatWithHistory(List<ChatMessage> messages) {
        try {
            ChatCompletionRequest request = ChatCompletionRequest.builder()
                    .model(model)
                    .messages(messages)
                    .temperature(0.7)
                    .maxTokens(1000)
                    .build();
            
            ChatCompletionResult result = openAiService.createChatCompletion(request);
            
            if (result.getChoices() != null && !result.getChoices().isEmpty()) {
                return result.getChoices().get(0).getMessage().getContent();
            }
            
            return "응답을 생성할 수 없습니다.";
            
        } catch (Exception e) {
            log.error("Error calling OpenAI chat API with history: {}", e.getMessage(), e);
            throw new RuntimeException("OpenAI API 호출 실패: " + e.getMessage(), e);
        }
    }
}
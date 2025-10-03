package com.a_hub.config;

import com.a_hub.service.ChatBotService;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.*;

import java.util.Map;

@Component
@RequiredArgsConstructor
public class NoticeWebSocketHandler implements WebSocketHandler {

    private final ChatBotService chatBotService;
    private final ObjectMapper objectMapper;

    @Override
    public void afterConnectionEstablished(WebSocketSession session) {
        System.out.println("✅ WebSocket 연결됨: " + session.getId());
    }

    @Override
    public void handleMessage(WebSocketSession session, WebSocketMessage<?> message) {
        try {
            String payload = message.getPayload().toString();
            String userMessage = objectMapper.readTree(payload).get("message").asText();

            // ChatBotService에서 content만 반환
            String answer = chatBotService.answerUserQuestion(userMessage);

            // \u0000 제거
            answer = answer.replace("\u0000", "");

            session.sendMessage(new TextMessage(
                objectMapper.writeValueAsString(Map.of("message", answer))
            ));
        } catch (Exception e) {
            e.printStackTrace();
            try {
                session.sendMessage(new TextMessage(
                    objectMapper.writeValueAsString(Map.of("message", "서버 오류 발생"))
                ));
            } catch (Exception ex) {
                ex.printStackTrace();
            }
        }
    }

    @Override
    public void handleTransportError(WebSocketSession session, Throwable exception) {
        exception.printStackTrace();
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus closeStatus) {
        System.out.println("❌ WebSocket 연결 종료: " + session.getId());
    }

    @Override
    public boolean supportsPartialMessages() {
        return false;
    }
}

package com.a_hub.controller;

import com.a_hub.dto.ChatRequestDto;
import com.a_hub.service.ChatBotService;
import lombok.RequiredArgsConstructor;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/chat")
@RequiredArgsConstructor
public class ChatBotController {

    private final ChatBotService chatBotService;

  @PostMapping("/query")
    public ResponseEntity<Map<String, String>> askChatQuery(@RequestBody Map<String, String> request) {
        String userMessage = request.get("message");

        // ✅ 여기서 answerUserQuestion 사용
        String answer = chatBotService.answerUserQuestion(userMessage);

        return ResponseEntity.ok(Map.of("message", answer));
    }



    // 상태 확인용 엔드포인트 추가
    @GetMapping("/status")
    public String status() {
        return "OK"; // 단순히 서버가 살아있음을 확인
    }
}


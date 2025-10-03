package com.a_hub.controller;

import com.a_hub.service.OpenAIEmbeddingService;
import com.a_hub.service.OpenAIService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/openai")
@RequiredArgsConstructor
public class OpenAiController {

    private final OpenAIEmbeddingService embeddingService;
    private final OpenAIService chatService;

    @PostMapping("/embedding")
    public float[] getEmbedding(@RequestBody String text) {
        return embeddingService.getEmbedding(text);
    }

    @PostMapping("/chat")
    public String askChat(@RequestBody String prompt) {
        return chatService.askGPT(prompt);
    }
}

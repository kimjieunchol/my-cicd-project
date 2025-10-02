package com.a_hub.config;

import com.theokanning.openai.OpenAiService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenAiConfig {

    @Bean
    public OpenAiService openAiService() {
        String apiKey = System.getenv("OPENAI_API_KEY"); // 환경변수에서 가져오기
        return new OpenAiService(apiKey);
    }
}

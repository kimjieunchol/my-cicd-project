package com.a_hub.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")                // 모든 엔드포인트 허용
                .allowedOrigins("http://localhost:3000") // 프론트 주소
                .allowedMethods("*")               // 모든 HTTP 메소드 허용
                .allowedHeaders("*")               // 모든 헤더 허용
                .allowCredentials(true)            // 인증 정보 허용
                .maxAge(3600);                     // pre-flight 캐시 시간 (초)
    }
}

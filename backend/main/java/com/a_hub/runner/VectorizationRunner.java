package com.a_hub.runner;

import com.a_hub.service.NoticeVectorizationService;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class VectorizationRunner implements CommandLineRunner {

    private final NoticeVectorizationService vectorizationService;

    @Override
    public void run(String... args) {
        System.out.println("🚀 VectorizationRunner 시작...");
        vectorizationService.vectorizeAllNotices();
        System.out.println("🎯 VectorizationRunner 종료");
    }
}

package com.a_hub.controller;

import com.a_hub.dto.VectorQueryDto;
import com.a_hub.dto.VectorUpdateDto;
import com.a_hub.entity.Notice;
import com.a_hub.service.NoticeService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/notices")
@RequiredArgsConstructor
public class NoticeController {

    private final NoticeService noticeService;

    // ------------------------------
    // 일반 조회
    // ------------------------------
    @GetMapping
    public List<Notice> getAllNotices() {
        return noticeService.getAllNotices();
    }

    @GetMapping("/{seq}")
    public Optional<Notice> getNoticeBySeq(@PathVariable String seq) {
        return noticeService.getNoticeBySeq(seq);
    }

    @GetMapping("/search")
    public List<Notice> searchByContent(@RequestParam String keyword) {
        return noticeService.searchByContent(keyword);
    }

    // ------------------------------
    // 벡터 업데이트
    // ------------------------------
    @PostMapping("/{id}/vector")
    public void updateVector(@PathVariable Long id, @RequestBody VectorUpdateDto dto) {
        noticeService.updateVector(id, dto.getVector());
    }

    // ------------------------------
    // 벡터 기반 검색 (topK 적용)
    // ------------------------------
    @PostMapping("/vector-search")
    public List<Notice> searchByVector(@RequestBody VectorQueryDto dto) {
        // topK null이면 1건, 지정하면 그 개수
        return noticeService.searchByVector(dto.getQueryVector(), dto.getTopK());
    }
}

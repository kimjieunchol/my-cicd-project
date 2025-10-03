package com.a_hub.service;

import com.a_hub.entity.Notice;
import com.a_hub.repository.NoticeRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Slf4j
@Service
@RequiredArgsConstructor
public class NoticeSearchService {

    private final NoticeRepository noticeRepository;
    private final NoticeVectorizationService vectorizationService;

    /**
     * 단일 텍스트 → float[] 임베딩
     */
    public float[] getEmbedding(String text) {
        return vectorizationService.vectorizeText(text);
    }

    /**
     * 벡터 기반 유사 공지 검색 (최신성 고려)
     */
    @Transactional(readOnly = true)
    public List<Notice> searchSimilarNotices(float[] queryVector, int topK) {
        String vectorStr = arrayToPostgresVector(queryVector);
        
        log.info("Searching with vector, topK: {}", topK);
        
        // 최신성을 고려한 검색 사용
        List<Notice> results = noticeRepository.searchByVectorWithRecency(vectorStr, topK);
        
        if (results.isEmpty()) {
            log.warn("No vector search results found, falling back to recent notices");
            results = noticeRepository.findAll(
                PageRequest.of(0, topK, Sort.by(Sort.Direction.DESC, "postDate"))
            ).getContent();
        }
        
        log.info("Found {} notices", results.size());
        return results;
    }
    
    /**
     * 기본 벡터 검색 (최신성 고려 안함)
     */
    @Transactional(readOnly = true)
    public List<Notice> searchSimilarNoticesBasic(float[] queryVector, int topK) {
        String vectorStr = arrayToPostgresVector(queryVector);
        return noticeRepository.searchByVector(vectorStr, topK);
    }
    
    /**
     * 최근 N일 이내 공지만 검색
     */
    @Transactional(readOnly = true)
    public List<Notice> searchRecentNotices(float[] queryVector, int topK, int recentDays) {
        String vectorStr = arrayToPostgresVector(queryVector);
        String startDate = LocalDate.now().minusDays(recentDays).toString();
        
        log.info("Searching notices from last {} days", recentDays);
        
        List<Notice> results = noticeRepository.searchByVectorAndDateRange(
            vectorStr, startDate, topK
        );
        
        if (results.isEmpty()) {
            log.warn("No recent notices found, searching all notices");
            results = searchSimilarNotices(queryVector, topK);
        }
        
        return results;
    }

    /**
     * 벡터 없는 공지 배치 조회 후 벡터 생성/업데이트
     */
    @Transactional
    public void updateNoticeVectorBatch(int limit, int offset) {
        List<Notice> batch = noticeRepository.findBatchWithoutVector(limit, offset);
        
        log.info("Processing {} notices without vectors", batch.size());

        for (Notice notice : batch) {
            try {
                float[] embedding = vectorizationService.vectorizeText(notice.getContent());
                String vectorStr = arrayToPostgresVector(embedding);
                noticeRepository.updateVectorById(notice.getId(), vectorStr);
                log.debug("Updated vector for notice ID: {}", notice.getId());
            } catch (Exception e) {
                log.error("Error updating vector for notice ID {}: {}", notice.getId(), e.getMessage());
            }
        }
    }
    
    /**
     * float[] → PostgreSQL vector 문자열 변환
     */
    private String arrayToPostgresVector(float[] array) {
        return "[" + 
            IntStream.range(0, array.length)
            .mapToObj(i -> Float.toString(array[i]))
            .collect(Collectors.joining(",")) 
            + "]";
    }
}
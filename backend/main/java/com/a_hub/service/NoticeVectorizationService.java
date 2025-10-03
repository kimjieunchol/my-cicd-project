package com.a_hub.service;

import com.a_hub.entity.Notice;
import com.a_hub.repository.NoticeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Service
@RequiredArgsConstructor
public class NoticeVectorizationService {

    private final OpenAIEmbeddingService embeddingService;
    private final NoticeRepository noticeRepository;

    /** 단일 텍스트 → float[] 임베딩 */
    public float[] vectorizeText(String text) {
        return embeddingService.getEmbedding(text);
    }

    /** float[] → Postgres vector 문자열 */
    private String arrayToPostgresVector(float[] array) {
        return "[" + IntStream.range(0, array.length)
                .mapToObj(i -> Float.toString(array[i]))
                .collect(Collectors.joining(",")) + "]";
    }

    /** 공지 하나 벡터화 후 저장 */
    @Transactional
    public void vectorizeAndSaveNotice(Notice notice) {
        // 벡터가 없는 공지만 처리 (벡터는 DB에만 존재하므로 항상 처리)
        float[] embedding = vectorizeText(notice.getContent());
        String vectorStr = arrayToPostgresVector(embedding);

        // 1. 엔티티가 이미 저장되어 있으면 ID가 있음
        if (notice.getId() == null) {
            // 새 공지인 경우 저장
            Notice savedNotice = noticeRepository.saveAndFlush(notice);
            noticeRepository.updateVectorById(savedNotice.getId(), vectorStr);
        } else {
            // 기존 공지인 경우 벡터만 업데이트
            noticeRepository.updateVectorById(notice.getId(), vectorStr);
        }
    }

    /** 벡터 없는 모든 공지 배치 처리 */
    @Transactional
    public void vectorizeAllNotices() {
        int batchSize = 100;
        int offset = 0;
        List<Notice> batch;
        do {
            batch = noticeRepository.findBatchWithoutVector(batchSize, offset);
            for (Notice n : batch) {
                vectorizeAndSaveNotice(n);
            }
            offset += batchSize;
        } while (!batch.isEmpty());
    }

    /** 단일 텍스트 → Postgres vector 문자열 반환 (검색용) */
    public String getVectorString(float[] vector) {
        return arrayToPostgresVector(vector);
    }
}
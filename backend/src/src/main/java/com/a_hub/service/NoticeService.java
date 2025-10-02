package com.a_hub.service;

import com.a_hub.entity.Notice;
import com.a_hub.repository.NoticeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Service
@RequiredArgsConstructor
public class NoticeService {

    private final NoticeRepository noticeRepository;

    public List<Notice> getAllNotices() { 
        return noticeRepository.findAll(); 
    }

    public Optional<Notice> getNoticeBySeq(String seq) { 
        return noticeRepository.findBySeq(seq); 
    }

    public List<Notice> searchByContent(String keyword) { 
        return noticeRepository.findByContentContaining(keyword); 
    }

    public List<Notice> searchByVector(float[] queryVector, int topK) {
        String vectorStr = toPostgresVector(queryVector);
        return noticeRepository.searchByVector(vectorStr, topK);
    }

    @Transactional
    public void updateVector(Long id, float[] vector) {
        String vectorStr = toPostgresVector(vector);
        noticeRepository.updateVectorById(id, vectorStr);
    }

    // float[] → '[0.12,0.34,...]' 형태 문자열 변환
    private String toPostgresVector(float[] vector) {
        return "[" + IntStream.range(0, vector.length)
                .mapToObj(i -> Float.toString(vector[i]))
                .collect(Collectors.joining(",")) + "]";
    }
}

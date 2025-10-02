package com.a_hub.service;

import com.a_hub.dto.NoticeJsonDto;
import com.a_hub.entity.Notice;
import com.a_hub.repository.NoticeRepository;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.InputStream;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.IntStream;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class NoticeIngestionService {

    private final NoticeRepository noticeRepository;
    private final NoticeVectorizationService vectorizationService;
    private final ObjectMapper objectMapper;

    @Transactional
    public void ingestNoticesFromJson() throws Exception {
        InputStream is = getClass().getResourceAsStream("/data/aca_notice_data_backup.json");
        List<NoticeJsonDto> noticeList = objectMapper.readValue(is, new TypeReference<List<NoticeJsonDto>>() {});

        int batchSize = 100;
        int count = 0;

        for (NoticeJsonDto dto : noticeList) {
            if (noticeRepository.existsBySeq(dto.getSeq())) continue;

            float[] vec = vectorizationService.vectorizeText(dto.getText());
            String vectorStr = IntStream.range(0, vec.length)
                    .mapToObj(i -> Float.toString(vec[i]))
                    .collect(Collectors.joining(",", "[", "]"));

            String[] dates = dto.getDate().split("\\(등록일 : ");
            LocalDate postDate = LocalDate.parse(dates[0]);
            LocalDate registerDate = LocalDate.parse(dates[1].replace(")", ""));

            Notice notice = Notice.builder()
                    .seq(dto.getSeq())
                    .url(dto.getUrl())
                    .content(dto.getText())
                    .imagePath(dto.getImage_path())
                    .contact(dto.getContact())
                    .department(dto.getDepartment())
                    .postDate(postDate)
                    .registerDate(registerDate)
                    .build();

            // 엔티티 저장
            Notice savedNotice = noticeRepository.saveAndFlush(notice);

            // 벡터 저장
            noticeRepository.updateVectorById(savedNotice.getId(), vectorStr);

            if (++count % batchSize == 0) {
                noticeRepository.flush();
            }
        }
    }
}

package com.a_hub.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EventDto {
    private Long id;
    private Long userId;
    private String title;
    private String description;
    private LocalDate eventDate;
    private LocalTime eventTime;
    private String eventType;
    private String location;
    private Boolean completed;  // 스케줄과 통합을 위해 추가
    private String priority;    // 스케줄과 통합을 위해 추가
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
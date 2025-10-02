package com.a_hub.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;
import java.time.LocalTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EventUpdateRequest {
    private String title;
    private String description;
    private LocalDate eventDate;
    private LocalTime eventTime;
    private String eventType;
    private String location;
    private Boolean completed;  // ✅ 추가
    private String priority;    // ✅ 추가
}

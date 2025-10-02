package com.a_hub.dto.request;

import java.time.LocalDate;
import java.time.LocalTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
public class EventCreateRequest {
    private String title;
    private String description;
    private LocalDate eventDate;
    private LocalTime eventTime;
    private String eventType;
    private String location;
    private Boolean completed; // ✅ 추가
    private String priority;   // ✅ 추가
}

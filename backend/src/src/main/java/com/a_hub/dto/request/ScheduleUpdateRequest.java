package com.a_hub.dto.request;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class ScheduleUpdateRequest {
    private String title;
    private String description;
    private String priority;
    private LocalDate dueDate;
    private Boolean completed;
}
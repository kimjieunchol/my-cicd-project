
package com.a_hub.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ScheduleCreateRequest {
    private Long userId;        // userId 추가
    private String title;
    private String description;
    private String priority;
    private LocalDate dueDate;
}
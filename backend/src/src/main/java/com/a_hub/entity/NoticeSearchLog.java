// src/main/java/com/a_hub/entity/NoticeSearchLog.java
package com.a_hub.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;

import java.time.LocalDateTime;

@Entity
@Table(name = "notice_search_logs")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NoticeSearchLog {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "query", nullable = false)
    private String query;
    
    @Column(name = "search_type")
    private String searchType;
    
    @Column(name = "result_count")
    private Integer resultCount;
    
    @Column(name = "execution_time_ms")
    private Long executionTimeMs;
    
    @Column(name = "user_ip")
    private String userIp;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
    }
}

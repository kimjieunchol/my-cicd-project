package com.a_hub.entity;

import lombok.*;
import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "notices")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Notice {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "seq")
    private String seq;              // 공지 시퀀스
    
    @Column(name = "url", columnDefinition = "TEXT")
    private String url;              // 원문 URL
    
    @Column(name = "content", nullable = false, columnDefinition = "TEXT")
    private String content;          // OCR/크롤링 텍스트
    
    @Column(name = "image_path", columnDefinition = "TEXT")
    private String imagePath;        // 이미지 경로
    
    @Column(name = "contact")
    private String contact;          // 연락처
    
    @Column(name = "department")
    private String department;       // 부서명
    
    @Column(name = "post_date")
    private LocalDate postDate;      // 게시일
    
    @Column(name = "register_date")
    private LocalDate registerDate;  // 등록일
    
    // vector는 네이티브 쿼리로만 처리하므로 엔티티에서 제외
    // @Column(name = "vector")
    // private PGvector vector;       
    
    // vector 필드가 DB에만 존재하고 엔티티에는 없으므로
    // 벡터 존재 여부는 Repository의 쿼리로 확인
    
    /**
     * 컨텐츠의 앞부분을 제목처럼 반환 (최대 50자)
     */
    public String getContentPreview() {
        if (content == null) return "";
        return content.length() > 50 
            ? content.substring(0, 50) + "..." 
            : content;
    }
    
    /**
     * 컨텐츠의 요약본 반환 (최대 100자)
     */
    public String getContentSummary() {
        if (content == null) return "";
        return content.length() > 100 
            ? content.substring(0, 100) + "..." 
            : content;
    }
}
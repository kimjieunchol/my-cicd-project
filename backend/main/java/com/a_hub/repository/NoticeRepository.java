package com.a_hub.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.a_hub.entity.Notice;

import java.util.List;
import java.util.Optional;

@Repository
public interface NoticeRepository extends JpaRepository<Notice, Long> {
    
    Optional<Notice> findBySeq(String seq);
    
    boolean existsBySeq(String seq);
    
    List<Notice> findByContentContaining(String keyword);
    
    /**
     * 벡터 유사도 검색 (코사인 유사도 기반)
     * 최신 공지를 우선하기 위해 post_date도 함께 고려
     */
    @Query(value = """
        SELECT * FROM notices 
        WHERE vector IS NOT NULL
        ORDER BY 
            (1 - (vector <=> CAST(:queryVector AS vector))) DESC,
            post_date DESC NULLS LAST
        LIMIT :topK
        """, nativeQuery = true)
    List<Notice> searchByVector(
        @Param("queryVector") String queryVector, 
        @Param("topK") int topK
    );
    
    /**
     * 최신 공지 우선 벡터 검색 (가중치 적용)
     * 유사도와 최신성을 함께 고려
     */
    @Query(value = """
        SELECT *, 
            (1 - (vector <=> CAST(:queryVector AS vector))) as similarity,
            EXTRACT(EPOCH FROM age(CURRENT_DATE, post_date)) / 86400.0 as days_ago
        FROM notices 
        WHERE vector IS NOT NULL
        ORDER BY 
            (1 - (vector <=> CAST(:queryVector AS vector))) * 0.7 +
            (CASE 
                WHEN post_date IS NULL THEN 0
                WHEN post_date >= CURRENT_DATE - INTERVAL '7 days' THEN 0.3
                WHEN post_date >= CURRENT_DATE - INTERVAL '30 days' THEN 0.2
                WHEN post_date >= CURRENT_DATE - INTERVAL '90 days' THEN 0.1
                ELSE 0.05
            END) DESC
        LIMIT :topK
        """, nativeQuery = true)
    List<Notice> searchByVectorWithRecency(
        @Param("queryVector") String queryVector, 
        @Param("topK") int topK
    );
    
    /**
     * 날짜 범위 내 벡터 검색
     */
    @Query(value = """
        SELECT * FROM notices 
        WHERE vector IS NOT NULL
        AND post_date >= CAST(:startDate AS DATE)
        ORDER BY 
            (1 - (vector <=> CAST(:queryVector AS vector))) DESC,
            post_date DESC
        LIMIT :topK
        """, nativeQuery = true)
    List<Notice> searchByVectorAndDateRange(
        @Param("queryVector") String queryVector,
        @Param("startDate") String startDate,
        @Param("topK") int topK
    );
    
    /**
     * 벡터 없는 공지 배치 조회
     */
    @Query(value = "SELECT * FROM notices WHERE vector IS NULL LIMIT :limit OFFSET :offset", 
           nativeQuery = true)
    List<Notice> findBatchWithoutVector(@Param("limit") int limit, @Param("offset") int offset);
    
    /**
     * 벡터 업데이트
     */
    @Modifying
    @Query(value = "UPDATE notices SET vector = CAST(:vectorStr AS vector) WHERE id = :id", 
           nativeQuery = true)
    void updateVectorById(@Param("id") Long id, @Param("vectorStr") String vectorStr);
    
    /**
     * 최신 공지 조회 (post_date 기준)
     */
    @Query("SELECT n FROM Notice n ORDER BY n.postDate DESC NULLS LAST")
    Page<Notice> findAllOrderByPostDateDesc(Pageable pageable);
    
    /**
     * 부서별 최신 공지
     */
    List<Notice> findByDepartmentOrderByPostDateDesc(String department);
}

package com.a_hub.repository;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import com.pgvector.PGvector;

@Repository
public class NoticeVectorRepository {

    private final JdbcTemplate jdbcTemplate;

    public NoticeVectorRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public void updateVectorById(Long id, PGvector vector) {
        String sql = "UPDATE notices SET vector = ? WHERE id = ?";
        jdbcTemplate.update(connection -> {
            var ps = connection.prepareStatement(sql);
            ps.setObject(1, vector); // PGvector 그대로 바인딩
            ps.setLong(2, id);
            return ps;
        });
    }
}

-- src/main/resources/schema.sql
CREATE EXTENSION IF NOT EXISTS vector;

-- 검색 로그 테이블
CREATE TABLE IF NOT EXISTS notice_search_logs (
    id SERIAL PRIMARY KEY,
    query TEXT NOT NULL,
    search_type VARCHAR(20),
    result_count INTEGER,
    execution_time_ms BIGINT,
    user_ip VARCHAR(45),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 벡터 검색 성능을 위한 인덱스
CREATE INDEX IF NOT EXISTS idx_notices_vector_cosine 
ON notices USING ivfflat (vector vector_cosine_ops) WITH (lists = 100);

-- 전문 검색을 위한 인덱스
CREATE INDEX IF NOT EXISTS idx_notices_content_fts 
ON notices USING gin(to_tsvector('korean', content));

-- 메타데이터 검색 인덱스
CREATE INDEX IF NOT EXISTS idx_notices_department ON notices(department);
CREATE INDEX IF NOT EXISTS idx_notices_post_date ON notices(post_date);
CREATE INDEX IF NOT EXISTS idx_notices_seq ON notices(seq);

-- 검색 로그 인덱스
CREATE INDEX IF NOT EXISTS idx_search_logs_created_at ON notice_search_logs(created_at);
CREATE INDEX IF NOT EXISTS idx_search_logs_query ON notice_search_logs(query);
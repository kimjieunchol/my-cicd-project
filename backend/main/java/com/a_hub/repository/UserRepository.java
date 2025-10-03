package com.a_hub.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.a_hub.entity.User;

import java.util.Optional;
import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    // 사용자명으로 조회 (대소문자 무시)
    Optional<User> findByUsernameIgnoreCase(String username);

    // 이메일로 조회 (대소문자 무시)
    Optional<User> findByEmailIgnoreCase(String email);

    // 특정 부서의 모든 사용자 조회
    List<User> findByDepartment(String department);

    // 특정 부서 사용자 페이징 조회
    Page<User> findByDepartment(String department, Pageable pageable);

    // 중복 검사
    boolean existsByUsernameIgnoreCase(String username);
    boolean existsByEmailIgnoreCase(String email);
}


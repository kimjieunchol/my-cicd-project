package com.a_hub.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.a_hub.entity.Schedule;
import com.a_hub.entity.User;

import java.util.List;

@Repository
public interface ScheduleRepository extends JpaRepository<Schedule, Long> {

    // UserId 기반
    List<Schedule> findByUserId(Long userId);
    List<Schedule> findByUserIdAndCompleted(Long userId, Boolean completed);
    List<Schedule> findByUserIdOrderByDueDateAsc(Long userId);

    // User 엔티티 기반 (ScheduleService에서 사용)
    List<Schedule> findByUserOrderByDueDateAsc(User user);
    List<Schedule> findByUserAndCompletedOrderByDueDateAsc(User user, Boolean completed);
}


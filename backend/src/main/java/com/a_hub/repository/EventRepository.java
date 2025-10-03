package com.a_hub.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.a_hub.entity.Event;
import com.a_hub.entity.User;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {

    // UserId 기반 조회
    List<Event> findByUserId(Long userId);
    List<Event> findByUserIdAndEventDate(Long userId, LocalDate eventDate);

    // User 엔티티 기반 조회 (EventService에서 사용)
    List<Event> findByUserOrderByEventDateAsc(User user);
    List<Event> findByUserAndEventDate(User user, LocalDate eventDate);
    List<Event> findByUserAndEventDateBetween(User user, LocalDate startDate, LocalDate endDate);
}


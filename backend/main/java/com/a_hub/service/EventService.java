package com.a_hub.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.a_hub.dto.EventDto;
import com.a_hub.entity.Event;
import com.a_hub.entity.User;
import com.a_hub.repository.EventRepository;
import com.a_hub.repository.UserRepository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EventService {

    private final EventRepository eventRepository;
    private final UserRepository userRepository;

    // ---------- 생성 ----------
    @Transactional
    public EventDto createEvent(Long userId, String title, String description,
                                LocalDate eventDate, LocalTime eventTime,
                                String eventType, String location,
                                Boolean completed, String priority) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Event event = Event.builder()
                .user(user)
                .title(title)
                .description(description)
                .eventDate(eventDate)
                .eventTime(eventTime)
                .eventType(eventType)
                .location(location)
                .completed(completed != null ? completed : false)
                .priority(priority != null ? priority : "medium")
                .build();

        Event savedEvent = eventRepository.save(event);
        return convertToDto(savedEvent);
    }

    // ---------- 조회 ----------
    public List<EventDto> getUserEvents(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return eventRepository.findByUserOrderByEventDateAsc(user).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public List<EventDto> getUserEventsByDate(Long userId, LocalDate date) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return eventRepository.findByUserAndEventDate(user, date).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public List<EventDto> getUserEventsByMonth(Long userId, int year, int month) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        LocalDate startDate = LocalDate.of(year, month, 1);
        LocalDate endDate = startDate.plusMonths(1).minusDays(1);

        return eventRepository.findByUserAndEventDateBetween(user, startDate, endDate).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public EventDto getEventById(Long id) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Event not found"));
        return convertToDto(event);
    }

    // ---------- 수정 ----------
    @Transactional
    public EventDto updateEvent(Long id, String title, String description,
                                LocalDate eventDate, LocalTime eventTime,
                                String eventType, String location,
                                Boolean completed, String priority) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Event not found"));

        if (title != null) event.setTitle(title);
        if (description != null) event.setDescription(description);
        if (eventDate != null) event.setEventDate(eventDate);
        if (eventTime != null) event.setEventTime(eventTime);
        if (eventType != null) event.setEventType(eventType);
        if (location != null) event.setLocation(location);
        if (completed != null) event.setCompleted(completed);
        if (priority != null) event.setPriority(priority);

        Event updatedEvent = eventRepository.save(event);
        return convertToDto(updatedEvent);
    }

    // ---------- 삭제 ----------
    @Transactional
    public void deleteEvent(Long id) {
        eventRepository.deleteById(id);
    }

    // ---------- DTO 변환 ----------
    private EventDto convertToDto(Event event) {
        return EventDto.builder()
                .id(event.getId())
                .userId(event.getUser().getId())
                .title(event.getTitle())
                .description(event.getDescription())
                .eventDate(event.getEventDate())
                .eventTime(event.getEventTime())
                .eventType(event.getEventType())
                .location(event.getLocation())
                .completed(event.getCompleted())
                .priority(event.getPriority())
                .createdAt(event.getCreatedAt())
                .updatedAt(event.getUpdatedAt())
                .build();
    }
}

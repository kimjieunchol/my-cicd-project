package com.a_hub.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.a_hub.dto.EventDto;
import com.a_hub.dto.ScheduleDto;
import com.a_hub.dto.request.ScheduleCreateRequest;
import com.a_hub.dto.request.ScheduleUpdateRequest;
import com.a_hub.service.EventService;
import com.a_hub.service.ScheduleService;

import java.util.List;
import java.util.stream.Collectors;
@RestController
@RequestMapping("/api/schedules")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class ScheduleController {
    
    private final ScheduleService scheduleService;
    private final EventService eventService;
  @PostMapping
    public ResponseEntity<ScheduleDto> createSchedule(@RequestBody ScheduleCreateRequest request) {
        ScheduleDto schedule = scheduleService.createSchedule(
            request.getUserId(),
            request.getTitle(),
            request.getDescription(),
            request.getPriority(),
            request.getDueDate()
        );
        return ResponseEntity.ok(schedule);
    }


    
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<ScheduleDto>> getUserSchedules(@PathVariable Long userId) {
        try {
            List<ScheduleDto> schedules = scheduleService.getUserSchedules(userId);
            return ResponseEntity.ok(schedules);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @GetMapping("/user/{userId}/status/{completed}")
    public ResponseEntity<List<ScheduleDto>> getUserSchedulesByStatus(
            @PathVariable Long userId,
            @PathVariable Boolean completed) {
        try {
            List<ScheduleDto> schedules = scheduleService.getUserSchedulesByStatus(userId, completed);
            return ResponseEntity.ok(schedules);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<ScheduleDto> getSchedule(@PathVariable Long id) {
        try {
            ScheduleDto schedule = scheduleService.getScheduleById(id);
            return ResponseEntity.ok(schedule);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<ScheduleDto> updateSchedule(
            @PathVariable Long id,
            @RequestBody ScheduleUpdateRequest request) {
        try {
            ScheduleDto schedule = scheduleService.updateSchedule(
                id,
                request.getTitle(),
                request.getDescription(),
                request.getPriority(),
                request.getDueDate(),
                request.getCompleted()
            );
            return ResponseEntity.ok(schedule);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @PutMapping("/{id}/toggle")
    public ResponseEntity<ScheduleDto> toggleComplete(@PathVariable Long id) {
        try {
            ScheduleDto schedule = scheduleService.toggleComplete(id);
            return ResponseEntity.ok(schedule);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSchedule(@PathVariable Long id) {
        try {
            scheduleService.deleteSchedule(id);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    @GetMapping("/user/{userId}/calendar")
    public ResponseEntity<List<EventDto>> getUserCalendar(@PathVariable Long userId) {
        // 이벤트
        List<EventDto> events = eventService.getUserEvents(userId);

        // 스케줄
        List<ScheduleDto> schedules = scheduleService.getUserSchedules(userId);

        // 스케줄 -> EventDto
        List<EventDto> scheduleEvents = schedules.stream()
            .map(s -> EventDto.builder()
                .id(s.getId() + 1000000) // 기존 이벤트 id와 충돌 방지
                .userId(s.getUserId())
                .title(s.getTitle())
                .description(s.getDescription())
                .eventDate(s.getDueDate())
                .eventTime(null)         // 캘린더에 시간 필요 시 LocalTime.MIN으로 설정
                .eventType("schedule")
                .completed(s.getCompleted())
                .priority(s.getPriority())
                .build())
            .collect(Collectors.toList());

        // 합치기
        events.addAll(scheduleEvents);

        return ResponseEntity.ok(events);
    }



}
package com.a_hub.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.a_hub.dto.EventDto;
import com.a_hub.dto.request.EventCreateRequest;
import com.a_hub.dto.request.EventUpdateRequest;
import com.a_hub.service.EventService;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/events")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class EventController {

    private final EventService eventService;

    @PostMapping("/user/{userId}")
    public ResponseEntity<EventDto> createEvent(
            @PathVariable Long userId,
            @RequestBody EventCreateRequest request) {

        EventDto event = eventService.createEvent(
                userId,
                request.getTitle(),
                request.getDescription(),
                request.getEventDate(),
                request.getEventTime(),
                request.getEventType(),
                request.getLocation(),
                request.getCompleted() != null ? request.getCompleted() : false, // 기본값 false
                request.getPriority() != null ? request.getPriority() : "medium"  // 기본값 medium
        );

    return ResponseEntity.ok(event);
}


    @GetMapping("/user/{userId}")
    public ResponseEntity<List<EventDto>> getUserEvents(@PathVariable Long userId) {
        return ResponseEntity.ok(eventService.getUserEvents(userId));
    }

    @GetMapping("/user/{userId}/date/{date}")
    public ResponseEntity<List<EventDto>> getUserEventsByDate(
            @PathVariable Long userId,
            @PathVariable String date) {
        LocalDate localDate = LocalDate.parse(date);
        return ResponseEntity.ok(eventService.getUserEventsByDate(userId, localDate));
    }

    @GetMapping("/user/{userId}/month/{year}/{month}")
    public ResponseEntity<List<EventDto>> getUserEventsByMonth(
            @PathVariable Long userId,
            @PathVariable int year,
            @PathVariable int month) {
        return ResponseEntity.ok(eventService.getUserEventsByMonth(userId, year, month));
    }

    @GetMapping("/{id}")
    public ResponseEntity<EventDto> getEvent(@PathVariable Long id) {
        return ResponseEntity.ok(eventService.getEventById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<EventDto> updateEvent(
            @PathVariable Long id,
            @RequestBody EventUpdateRequest request) {
        EventDto event = eventService.updateEvent(
                id,
                request.getTitle(),
                request.getDescription(),
                request.getEventDate(),
                request.getEventTime(),
                request.getEventType(),
                request.getLocation(),
                request.getCompleted(),  // ✅ 추가
                request.getPriority()    // ✅ 추가
        );
        return ResponseEntity.ok(event);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEvent(@PathVariable Long id) {
        eventService.deleteEvent(id);
        return ResponseEntity.noContent().build();
    }

    
}

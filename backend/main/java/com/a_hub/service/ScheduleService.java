package com.a_hub.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.a_hub.dto.ScheduleDto;
import com.a_hub.entity.Schedule;
import com.a_hub.entity.User;
import com.a_hub.repository.ScheduleRepository;
import com.a_hub.repository.UserRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ScheduleService {
    
    private final ScheduleRepository scheduleRepository;
    private final UserRepository userRepository;
    
    @Transactional
    public ScheduleDto createSchedule(Long userId, String title, String description, 
                                      String priority, LocalDate dueDate) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        Schedule schedule = Schedule.builder()
                .user(user)
                .title(title)
                .description(description)
                .priority(priority)
                .dueDate(dueDate)
                .completed(false)
                .build();
        
        Schedule savedSchedule = scheduleRepository.save(schedule);
        return convertToDto(savedSchedule);
    }
    
    public List<ScheduleDto> getUserSchedules(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        return scheduleRepository.findByUserOrderByDueDateAsc(user).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }
    
    public List<ScheduleDto> getUserSchedulesByStatus(Long userId, Boolean completed) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        return scheduleRepository.findByUserAndCompletedOrderByDueDateAsc(user, completed).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }
    
    public ScheduleDto getScheduleById(Long id) {
        Schedule schedule = scheduleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Schedule not found"));
        return convertToDto(schedule);
    }
    
    @Transactional
    public ScheduleDto updateSchedule(Long id, String title, String description, 
                                      String priority, LocalDate dueDate, Boolean completed) {
        Schedule schedule = scheduleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Schedule not found"));
        
        if (title != null) schedule.setTitle(title);
        if (description != null) schedule.setDescription(description);
        if (priority != null) schedule.setPriority(priority);
        if (dueDate != null) schedule.setDueDate(dueDate);
        if (completed != null) schedule.setCompleted(completed);
        
        Schedule updatedSchedule = scheduleRepository.save(schedule);
        return convertToDto(updatedSchedule);
    }
    
    @Transactional
    public ScheduleDto toggleComplete(Long id) {
        Schedule schedule = scheduleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Schedule not found"));
        
        schedule.setCompleted(!schedule.getCompleted());
        Schedule updatedSchedule = scheduleRepository.save(schedule);
        return convertToDto(updatedSchedule);
    }
    
    @Transactional
    public void deleteSchedule(Long id) {
        scheduleRepository.deleteById(id);
    }
    
    private ScheduleDto convertToDto(Schedule schedule) {
        return ScheduleDto.builder()
                .id(schedule.getId())
                .userId(schedule.getUser().getId())
                .title(schedule.getTitle())
                .description(schedule.getDescription())
                .priority(schedule.getPriority())
                .dueDate(schedule.getDueDate())
                .completed(schedule.getCompleted())
                .createdAt(schedule.getCreatedAt())
                .updatedAt(schedule.getUpdatedAt())
                .build();
    }
}
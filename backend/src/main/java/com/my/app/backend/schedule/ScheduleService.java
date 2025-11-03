package com.my.app.backend.schedule;

import com.my.app.backend.user.User;
import com.my.app.backend.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ScheduleService {

    @Autowired
    private ScheduleRepository scheduleRepository;

    @Autowired
    private ScheduleReminderRepository reminderRepository;

    @Autowired
    private UserRepository userRepository;

    private User getCurrentUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();
        return userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다."));
    }

    public Schedule create(Schedule schedule) {
        User user = getCurrentUser();
        if (user.getCoupleId() == null) {
            throw new RuntimeException("매칭된 커플이 없습니다.");
        }
        schedule.setCoupleId(user.getCoupleId());
        schedule.setCreatedBy(user.getId());
        Schedule saved = scheduleRepository.save(schedule);
        if (saved.getReminders() != null) {
            saved.getReminders().forEach(r -> {
                r.setSchedule(saved);
            });
            reminderRepository.saveAll(saved.getReminders());
        }
        return saved;
    }

    public List<Schedule> list(LocalDateTime from, LocalDateTime to) {
        User user = getCurrentUser();
        if (user.getCoupleId() == null) {
            throw new RuntimeException("매칭된 커플이 없습니다.");
        }
        return scheduleRepository.findByCoupleIdAndStartAtBetweenOrderByStartAtAsc(user.getCoupleId(), from, to);
    }

    public Optional<Schedule> get(Long id) {
        User user = getCurrentUser();
        Optional<Schedule> sched = scheduleRepository.findById(id);
        if (sched.isPresent()) {
            if (!sched.get().getCoupleId().equals(user.getCoupleId())) {
                throw new RuntimeException("권한이 없습니다.");
            }
        }
        return sched;
    }

    public Schedule update(Long id, Schedule updated) {
        User user = getCurrentUser();
        Schedule existing = scheduleRepository.findById(id).orElseThrow(() -> new RuntimeException("일정을 찾을 수 없습니다."));
        if (!existing.getCoupleId().equals(user.getCoupleId())) {
            throw new RuntimeException("권한이 없습니다.");
        }

        existing.setTitle(updated.getTitle());
        existing.setDescription(updated.getDescription());
        existing.setLocation(updated.getLocation());
        existing.setAllDay(Boolean.TRUE.equals(updated.getAllDay()));
        existing.setStartAt(updated.getStartAt());
        existing.setEndAt(updated.getEndAt());
        existing.setRepeatRule(updated.getRepeatRule());
        existing.setRepeatUntil(updated.getRepeatUntil());
        existing.setVisibility(updated.getVisibility());
        existing.setStatus(updated.getStatus());
        existing.setUpdatedAt(LocalDateTime.now());

        // replace reminders
        if (existing.getReminders() != null) {
            existing.getReminders().clear();
        }
        if (updated.getReminders() != null) {
            updated.getReminders().forEach(r -> {
                r.setSchedule(existing);
            });
            existing.setReminders(updated.getReminders());
        }

        return scheduleRepository.save(existing);
    }

    public void delete(Long id) {
        User user = getCurrentUser();
        Schedule existing = scheduleRepository.findById(id).orElseThrow(() -> new RuntimeException("일정을 찾을 수 없습니다."));
        if (!existing.getCoupleId().equals(user.getCoupleId())) {
            throw new RuntimeException("권한이 없습니다.");
        }
        scheduleRepository.deleteById(id);
    }
}




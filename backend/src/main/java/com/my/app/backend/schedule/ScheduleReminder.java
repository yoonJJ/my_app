package com.my.app.backend.schedule;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Table(name = "schedule_reminders")
@Data
public class ScheduleReminder {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "schedule_id", nullable = false)
    private Schedule schedule;

    @Column(name = "minutes_before", nullable = false)
    private Integer minutesBefore;

    @Column(length = 20)
    private String method = "PUSH";

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();
}




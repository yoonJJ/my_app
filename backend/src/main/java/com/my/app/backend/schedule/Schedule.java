package com.my.app.backend.schedule;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "schedules")
@Data
public class Schedule {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "couple_id", nullable = false)
    private Long coupleId;

    @Column(name = "created_by", nullable = false)
    private Long createdBy;

    @Column(length = 100, nullable = false)
    private String title;

    @Column(length = 1000)
    private String description;

    @Column(length = 255)
    private String location;

    @Column(name = "all_day")
    private Boolean allDay = false;

    @Column(name = "start_at", nullable = false)
    private LocalDateTime startAt;

    @Column(name = "end_at", nullable = false)
    private LocalDateTime endAt;

    @Column(name = "repeat_rule", length = 50)
    private String repeatRule; // e.g., NONE, DAILY, WEEKLY, MONTHLY, YEARLY

    @Column(name = "repeat_until")
    private LocalDate repeatUntil;

    @Column(length = 20)
    private String visibility = "COUPLE"; // PRIVATE or COUPLE

    @Column(length = 20)
    private String status = "CONFIRMED"; // CONFIRMED or CANCELED

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "schedule", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ScheduleReminder> reminders;
}




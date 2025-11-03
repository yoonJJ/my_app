package com.my.app.backend.schedule;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ScheduleReminderRepository extends JpaRepository<ScheduleReminder, Long> {
}




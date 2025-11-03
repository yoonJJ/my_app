package com.my.app.backend.schedule;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ScheduleRepository extends JpaRepository<Schedule, Long> {
    List<Schedule> findByCoupleIdAndStartAtBetweenOrderByStartAtAsc(Long coupleId, LocalDateTime from, LocalDateTime to);
}




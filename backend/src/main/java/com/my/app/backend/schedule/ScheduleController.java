package com.my.app.backend.schedule;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/schedules")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@Tag(name = "일정", description = "일정 관리 API")
public class ScheduleController {

    @Autowired
    private ScheduleService scheduleService;

    @Operation(summary = "일정 생성")
    @PostMapping
    public Schedule create(@RequestBody Schedule schedule) {
        return scheduleService.create(schedule);
    }

    @Operation(summary = "일정 기간 조회")
    @GetMapping
    public List<Schedule> list(
            @RequestParam("from") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime from,
            @RequestParam("to") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime to
    ) {
        return scheduleService.list(from, to);
    }

    @Operation(summary = "일정 상세")
    @GetMapping("/{id}")
    public Schedule get(@PathVariable Long id) {
        return scheduleService.get(id).orElse(null);
    }

    @Operation(summary = "일정 수정")
    @PutMapping("/{id}")
    public Schedule update(@PathVariable Long id, @RequestBody Schedule schedule) {
        return scheduleService.update(id, schedule);
    }

    @Operation(summary = "일정 삭제")
    @DeleteMapping("/{id}")
    public String delete(@PathVariable Long id) {
        scheduleService.delete(id);
        return "OK";
    }
}




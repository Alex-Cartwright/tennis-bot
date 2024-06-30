package com.cartyac.tennisbot.controller;

import com.cartyac.tennisbot.model.ScheduledBooking;
import com.cartyac.tennisbot.service.ScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/scheduled_bookings")
public class ScheduleController {

    private final ScheduleService scheduleService;

    @Autowired
    public ScheduleController(ScheduleService scheduleService) {
        this.scheduleService = scheduleService;
    }

    @GetMapping
    public List<ScheduledBooking> getAllScheduledBookings() {
        return scheduleService.findAll();
    }

    @PostMapping
    public ScheduledBooking addScheduledBooking(@RequestBody ScheduledBooking scheduledBooking) {
        return scheduleService.save(scheduledBooking);
    }

    @DeleteMapping("/{id}")
    public void deleteScheduledBooking(@PathVariable UUID id) {
        scheduleService.deleteById(id);
    }

    @PutMapping("/{id}")
    public ScheduledBooking updateScheduledBooking(@PathVariable UUID id, @RequestBody ScheduledBooking scheduledBooking) {
        scheduledBooking.setId(id);
        return scheduledBooking;
    }
}

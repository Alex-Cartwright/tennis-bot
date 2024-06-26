package com.cartyac.tennisbot.controller;

import com.cartyac.tennisbot.model.ScheduledBooking;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@RequestMapping("/schedule")
public class ScheduleController {

    @GetMapping
    public List<ScheduledBooking> getAllScheduledBookings() {
        return scheduleService.findAll();
    }
}

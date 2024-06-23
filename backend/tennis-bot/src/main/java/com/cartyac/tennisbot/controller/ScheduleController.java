package com.cartyac.tennisbot.controller;

import com.cartyac.tennisbot.services.ScheduleService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ScheduleController {

    private final ScheduleService service;

    public ScheduleController(ScheduleService service) {
        this.service = service;
    }

    @GetMapping("/schedule")
    public String getSchedule() {
        return service.getSchedule();
    }
}

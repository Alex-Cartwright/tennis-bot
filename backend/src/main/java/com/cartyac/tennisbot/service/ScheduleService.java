package com.cartyac.tennisbot.service;

import com.cartyac.tennisbot.model.ScheduledBooking;
import com.cartyac.tennisbot.repository.ScheduleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ScheduleService {

    @Autowired
    private ScheduleRepository scheduleRepository;

    public List<ScheduledBooking> findAll(){
        return scheduleRepository.findAll();
    }
}

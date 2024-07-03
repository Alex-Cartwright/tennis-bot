package com.cartyac.tennisbot.repository;

import com.cartyac.tennisbot.model.Location;
import com.cartyac.tennisbot.model.ScheduledBooking;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ScheduleRepository extends JpaRepository<ScheduledBooking, UUID> {

    boolean existsByLocation(Location location);
}

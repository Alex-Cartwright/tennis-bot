package com.cartyac.tennisbot.repository;

import com.cartyac.tennisbot.model.Location;
import com.cartyac.tennisbot.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface BookingRepository extends JpaRepository<Booking, UUID> {

    boolean existsByLocation(Location location);
}

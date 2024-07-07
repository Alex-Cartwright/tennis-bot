package com.cartyac.tennisbot.service.api;

import com.cartyac.tennisbot.model.Booking;

import java.util.List;
import java.util.UUID;

public interface BookingService {

    List<Booking> findAll();
    void deleteById(UUID id);
    Booking save(Booking booking);
    Booking update(UUID id, Booking booking);
}

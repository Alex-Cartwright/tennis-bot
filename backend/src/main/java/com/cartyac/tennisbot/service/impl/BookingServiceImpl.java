package com.cartyac.tennisbot.service.impl;

import com.cartyac.tennisbot.model.Booking;
import com.cartyac.tennisbot.repository.BookingRepository;
import com.cartyac.tennisbot.service.api.BookingService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class BookingServiceImpl implements BookingService {

    private final BookingRepository bookingRepository;

    @Autowired
    public BookingServiceImpl(BookingRepository bookingRepository) {
        this.bookingRepository = bookingRepository;
    }

    @Override
    public List<Booking> findAll(){
        return bookingRepository.findAll();
    }

    @Override
    public void deleteById(UUID id) {
        bookingRepository.findById(id).orElseThrow(() ->
                new EntityNotFoundException(String.format("Booking with id %s not found", id))
        );

        bookingRepository.deleteById(id);
    }

    @Override
    public Booking save(Booking booking) {
        return bookingRepository.save(booking);
    }

    @Override
    public Booking update(UUID id, Booking booking) {
        bookingRepository.findById(id).orElseThrow(() ->
                new EntityNotFoundException(String.format("Booking with id %s not found", id)));

        return bookingRepository.save(booking);
    }
}

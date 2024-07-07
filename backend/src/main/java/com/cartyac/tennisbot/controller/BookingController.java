package com.cartyac.tennisbot.controller;

import com.cartyac.tennisbot.dto.booking.BookingRequestDTO;
import com.cartyac.tennisbot.dto.booking.BookingResponseDTO;
import com.cartyac.tennisbot.model.Booking;
import com.cartyac.tennisbot.service.api.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/scheduled_bookings")
public class BookingController {

    private final BookingService bookingService;

    @Autowired
    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @GetMapping
    public List<BookingResponseDTO> getAllBookings() {
        return bookingService.findAll()
                .stream()
                .map(BookingResponseDTO::new)
                .toList();
    }

    @PostMapping
    public ResponseEntity<BookingResponseDTO> addScheduledBooking(@RequestBody BookingRequestDTO bookingRequestDTO) {
        Booking booking = bookingRequestDTO.toEntity();
        Booking savedBooking = bookingService.save(booking);
        return ResponseEntity.ok(new BookingResponseDTO(savedBooking));
    }

    @DeleteMapping("/{id}")
    public void deleteScheduledBooking(@PathVariable UUID id) {
        bookingService.deleteById(id);
    }

    @PutMapping("/{id}")
    public Booking updateScheduledBooking(@PathVariable UUID id, @RequestBody BookingRequestDTO bookingRequestDTO) {
        Booking booking = bookingRequestDTO.toEntity();
        return bookingService.update(id, booking);
    }
}

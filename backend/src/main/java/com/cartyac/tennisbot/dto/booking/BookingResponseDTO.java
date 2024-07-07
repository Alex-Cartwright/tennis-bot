package com.cartyac.tennisbot.dto.booking;

import com.cartyac.tennisbot.dto.location.LocationRequestDTO;
import com.cartyac.tennisbot.dto.location.LocationResponseDTO;
import com.cartyac.tennisbot.model.Booking;
import com.cartyac.tennisbot.model.BookingStatus;

import java.time.OffsetDateTime;
import java.util.UUID;

public record BookingResponseDTO(
        UUID id,
        LocationResponseDTO location,
        OffsetDateTime bookingTime,
        BookingStatus status
) {
    public BookingResponseDTO(Booking booking) {
        this(
                booking.getId(),
                new LocationResponseDTO(booking.getLocation()),
                booking.getBookingTime(),
                booking.getStatus()
        );
    }
}

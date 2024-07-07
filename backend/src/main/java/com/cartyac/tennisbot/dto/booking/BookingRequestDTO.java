package com.cartyac.tennisbot.dto.booking;

import com.cartyac.tennisbot.dto.location.LocationRequestDTO;
import com.cartyac.tennisbot.model.Booking;
import com.cartyac.tennisbot.model.BookingStatus;

import java.time.OffsetDateTime;

public record BookingRequestDTO(
        LocationRequestDTO location,
        OffsetDateTime bookingTime
){
    public Booking toEntity(){
        return Booking.builder()
                .location(location.toEntity())
                .bookingTime(bookingTime)
                .status(BookingStatus.PENDING)
                .build();
    }
}

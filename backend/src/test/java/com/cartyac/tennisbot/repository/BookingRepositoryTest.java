package com.cartyac.tennisbot.repository;

import com.cartyac.tennisbot.model.BookingStatus;
import com.cartyac.tennisbot.model.Location;
import com.cartyac.tennisbot.model.Booking;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.time.OffsetDateTime;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;

@DataJpaTest
class BookingRepositoryTest {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private LocationRepository locationRepository;

    Location location = mock(Location.class);
    Booking schedule = Booking.builder()
            .location(location)
            .bookingTime(OffsetDateTime.of(2021, 1, 1, 12, 0, 0, 0, OffsetDateTime.now().getOffset()))
            .status(BookingStatus.PENDING)
            .build();

    @BeforeEach
    void setUp() {
        locationRepository.save(location);
    }

    @Test
    void findById_ShouldFindScheduleById() {
        bookingRepository.save(schedule);

        Booking booking = bookingRepository.findById(schedule.getId()).orElse(null);

        assertNotNull(booking);
    }

    @Test
    void existsByLocation_ShouldReturnTrue() {
        bookingRepository.save(schedule);

        boolean exists = bookingRepository.existsByLocation(location);

        assertTrue(exists);
    }

    @Test
    void existsByLocation_ShouldReturnFalse() {
        boolean exists = bookingRepository.existsByLocation(location);
        bookingRepository.flush();

        assertFalse(exists);
    }
}
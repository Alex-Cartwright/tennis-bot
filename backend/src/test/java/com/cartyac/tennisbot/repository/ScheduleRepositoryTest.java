package com.cartyac.tennisbot.repository;

import com.cartyac.tennisbot.model.BookingStatus;
import com.cartyac.tennisbot.model.Location;
import com.cartyac.tennisbot.model.ScheduledBooking;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.time.OffsetDateTime;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;

@DataJpaTest
class ScheduleRepositoryTest {

    @Autowired
    private ScheduleRepository scheduleRepository;

    @Autowired
    private LocationRepository locationRepository;

    Location location = mock(Location.class);
    ScheduledBooking schedule = ScheduledBooking.builder()
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
        scheduleRepository.save(schedule);

        ScheduledBooking booking = scheduleRepository.findById(schedule.getId()).orElse(null);

        assertNotNull(booking);
    }

    @Test
    void existsByLocation_ShouldReturnTrue() {
        scheduleRepository.save(schedule);

        boolean exists = scheduleRepository.existsByLocation(location);

        assertTrue(exists);
    }

    @Test
    void existsByLocation_ShouldReturnFalse() {
        boolean exists = scheduleRepository.existsByLocation(location);
        scheduleRepository.flush();

        assertFalse(exists);
    }
}
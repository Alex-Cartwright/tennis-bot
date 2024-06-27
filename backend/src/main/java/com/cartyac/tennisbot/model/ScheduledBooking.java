package com.cartyac.tennisbot.model;

import jakarta.persistence.*;

import java.time.OffsetDateTime;
import java.util.UUID;

/**
 * Represents a scheduled booking for a tennis court.
 */
@Entity
@Table(name = "scheduled_bookings")
@Data
public class ScheduledBooking {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "location")
    private Location location;

    @Column(name = "booking_time")
    private OffsetDateTime bookingTime;

    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    private BookingStatus status;
}

package com.cartyac.tennisbot.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.OffsetDateTime;
import java.util.UUID;

/**
 * Represents a scheduled booking for a tennis court.
 */
@Entity
@Table(name = "scheduled_bookings")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Booking {

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
    private BookingStatus status = BookingStatus.PENDING;
}

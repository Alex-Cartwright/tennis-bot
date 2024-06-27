package com.cartyac.tennisbot.model;

public enum BookingStatus {
    // Service is scheduled to make the booking.
    PENDING,

    // Service has successfully booked the booking.
    CONFIRMED,

    // Booking was cancelled by the user before the service attempted to book.
    CANCELLED,

    // Service attempted to book but failed.
    FAILED
}

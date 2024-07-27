package com.cartyac.tennisbot.dto.booking;

public record CardDetails(
        String cardholderName,
        String cardNumber,
        String expiryDate,
        String securityCode
) {
}

package com.cartyac.tennisbot.dto.booking;

public record BillingDetails(
    String firstName,
    String lastName,
    String addressLine1,
    String town,
    String postcode
) {
}

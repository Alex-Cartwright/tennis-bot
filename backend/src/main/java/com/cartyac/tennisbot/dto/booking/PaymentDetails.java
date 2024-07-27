package com.cartyac.tennisbot.dto.booking;

public record PaymentDetails(
        BillingDetails billingDetails,
        CardDetails cardDetails
) {
}

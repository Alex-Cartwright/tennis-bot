package com.cartyac.tennisbot.exception;

/**
 * Thrown when the web booking service tries to book a location and time but there are no available
 * courts.
 */
public class AllCourtsFullException extends RuntimeException {
}

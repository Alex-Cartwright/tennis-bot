package com.cartyac.tennisbot.controller;

import com.cartyac.tennisbot.dto.booking.BookingResponseDTO;
import com.cartyac.tennisbot.model.Booking;
import com.cartyac.tennisbot.service.WebService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/web")
public class WebController {

    private final WebService webService;

    @Autowired
    public WebController(WebService webService) {
        this.webService = webService;
    }

    @PostMapping("/book")
    public ResponseEntity<BookingResponseDTO> book(@RequestBody Booking booking) {
        try {
            webService.makeBooking(booking);
            return ResponseEntity.ok(new BookingResponseDTO(booking));
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}

package com.cartyac.tennisbot.controller;

import com.cartyac.tennisbot.model.Location;
import com.cartyac.tennisbot.service.LocationService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.UUID;

@WebMvcTest(LocationController.class)
class LocationControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private LocationService locationService;

    private ObjectMapper objectMapper = new ObjectMapper();

    @Test
    void getAllLocations() {
        Location location = new Location(UUID.randomUUID(), "Lea", "URL1", true);
    }
}
package com.cartyac.tennisbot;

import com.cartyac.tennisbot.model.Location;
import com.cartyac.tennisbot.service.LocationService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.List;
import java.util.UUID;

import static org.mockito.Mockito.*;
        import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
        import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest
public class LocationControllerTests {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private LocationService locationService;

    private ObjectMapper objectMapper = new ObjectMapper();

    @Test
    void testGetAllLocations() throws Exception {
        Location location1 = new Location();
        location1.setId(UUID.randomUUID());
        location1.setName("Location 1");
        location1.setUrl("http://example.com/1");

        Location location2 = new Location();
        location2.setId(UUID.randomUUID());
        location2.setName("Location 2");
        location2.setUrl("http://example.com/2");

        List<Location> locations = Arrays.asList(location1, location2);

        when(locationService.findAll()).thenReturn(locations);

        mockMvc.perform(get("/locations"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(2))
                .andExpect(jsonPath("$[0].name").value("Location 1"))
                .andExpect(jsonPath("$[1].name").value("Location 2"));

        verify(locationService, times(1)).findAll();
    }

    @Test
    void testGetLocationById() throws Exception {
        UUID id = UUID.randomUUID();
        Location location = new Location();
        location.setId(id);
        location.setName("Location");
        location.setUrl("http://example.com");

        when(locationService.findById(id)).thenReturn(location);

        mockMvc.perform(get("/locations/{id}", id))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Location"));

        verify(locationService, times(1)).findById(id);
    }

    @Test
    void testCreateLocation() throws Exception {
        Location location = new Location();
        location.setName("Location");
        location.setUrl("http://example.com");

        when(locationService.save(any(Location.class))).thenReturn(location);

        mockMvc.perform(post("/locations")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(location)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Location"));

        verify(locationService, times(1)).save(any(Location.class));
    }

    @Test
    void testDeleteLocation() throws Exception {
        UUID id = UUID.randomUUID();

        doNothing().when(locationService).deleteById(id);

        mockMvc.perform(delete("/locations/{id}", id))
                .andExpect(status().isOk());

        verify(locationService, times(1)).deleteById(id);
    }
}

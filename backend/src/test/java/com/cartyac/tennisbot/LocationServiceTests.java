package com.cartyac.tennisbot;

import com.cartyac.tennisbot.model.Location;
import com.cartyac.tennisbot.repository.LocationRepository;
import com.cartyac.tennisbot.service.LocationService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class LocationServiceTests {

    @InjectMocks
    private LocationService locationService;

    @Mock
    private LocationRepository locationRepository;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testFindAll() {
        Location location1 = new Location();
        location1.setId(UUID.randomUUID());
        location1.setName("Location 1");
        location1.setUrl("http://example.com/1");

        Location location2 = new Location();
        location2.setId(UUID.randomUUID());
        location2.setName("Location 2");
        location2.setUrl("http://example.com/2");

        List<Location> locations = Arrays.asList(location1, location2);

        when(locationRepository.findAll()).thenReturn(locations);

        List<Location> result = locationService.findAll();

        assertEquals(2, result.size());
        verify(locationRepository, times(1)).findAll();
    }

    @Test
    void testFindById() {
        UUID id = UUID.randomUUID();
        Location location = new Location();
        location.setId(id);
        location.setName("Location");
        location.setUrl("http://example.com");

        when(locationRepository.findById(id)).thenReturn(Optional.of(location));

        Location result = locationService.findById(id);

        assertNotNull(result);
        assertEquals("Location", result.getName());
        verify(locationRepository, times(1)).findById(id);
    }

    @Test
    void testSave() {
        Location location = new Location();
        location.setId(UUID.randomUUID());
        location.setName("Location");
        location.setUrl("http://example.com");

        when(locationRepository.save(location)).thenReturn(location);

        Location result = locationService.save(location);

        assertNotNull(result);
        assertEquals("Location", result.getName());
        verify(locationRepository, times(1)).save(location);
    }

    @Test
    void testDeleteById() {
        UUID id = UUID.randomUUID();

        doNothing().when(locationRepository).deleteById(id);

        locationService.deleteById(id);

        verify(locationRepository, times(1)).deleteById(id);
    }
}

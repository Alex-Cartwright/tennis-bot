package com.cartyac.tennisbot;


import com.cartyac.tennisbot.model.Location;
import com.cartyac.tennisbot.repository.LocationRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.List;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

@DataJpaTest
public class LocationRepositoryTests {

    @Autowired
    private LocationRepository locationRepository;

    @Test
    void testSaveAndFindAll() {
        Location location = new Location();
        location.setId(UUID.randomUUID());
        location.setName("Location");
        location.setUrl("http://example.com");

        locationRepository.save(location);

        List<Location> locations = locationRepository.findAll();

        assertEquals(1, locations.size());
        assertEquals("Location", locations.get(0).getName());
    }

    @Test
    void testFindById() {
        UUID id = UUID.randomUUID();
        Location location = new Location();
        location.setId(id);
        location.setName("Location");
        location.setUrl("http://example.com");

        locationRepository.save(location);

        assertTrue(locationRepository.findById(id).isPresent());
    }

    @Test
    void testDeleteById() {
        UUID id = UUID.randomUUID();
        Location location = new Location();
        location.setId(id);
        location.setName("Location");
        location.setUrl("http://example.com");

        locationRepository.save(location);
        locationRepository.deleteById(id);

        assertTrue(locationRepository.findById(id).isEmpty());
    }
}

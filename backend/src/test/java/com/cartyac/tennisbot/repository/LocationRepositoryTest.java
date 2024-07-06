package com.cartyac.tennisbot.repository;

import com.cartyac.tennisbot.model.Location;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
class LocationRepositoryTest {

    @Autowired
    private LocationRepository locationRepository;

    Location location = Location.builder()
                .name("Lea")
                .url("URL1")
                .isActive(true)
                .build();

    @Test
    void save_ShouldSaveLocation() {
        Location savedLocation = locationRepository.save(location);

        assertNotNull(savedLocation);
        assertNotNull(savedLocation.getId());
    }

    @Test
    void findById_ShouldFindLocationById() {
        locationRepository.save(location);

        Location foundLocation = locationRepository.findById(location.getId()).orElse(null);

        assertNotNull(foundLocation);
    }

    @Test
    void delete_ShouldDeleteLocation() {
        Location savedLocation = locationRepository.save(location);

        locationRepository.delete(savedLocation);

        Location foundLocation = locationRepository.findById(savedLocation.getId()).orElse(null);

        assertNull(foundLocation);
    }

    @Test
    void findAll_ShouldFindAllLocations() {
        Location location2 = Location.builder()
                .name("Islington")
                .url("URL1")
                .isActive(true)
                .build();

        locationRepository.save(location);
        locationRepository.save(location2);

        List<Location> locations = locationRepository.findAll();

        assertNotNull(locations);
        assertEquals(2, locations.size());
    }

    @Test
    void findAllByIsActiveTrue_ShouldFindAllActiveLocations() {
        Location location2 = Location.builder()
                .name("Islington")
                .url("URL1")
                .isActive(false)
                .build();

        locationRepository.save(location);
        locationRepository.save(location2);

        List<Location> locations = locationRepository.findAllByIsActiveTrue();

        assertNotNull(locations);
        assertTrue(locations.contains(location));
        assertTrue(!locations.contains(location2));
    }
}

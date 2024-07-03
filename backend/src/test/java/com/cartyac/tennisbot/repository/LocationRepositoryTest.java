package com.cartyac.tennisbot.repository;

import com.cartyac.tennisbot.model.Location;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.jdbc.EmbeddedDatabaseConnection;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import static org.junit.jupiter.api.Assertions.assertNotNull;

@DataJpaTest
@AutoConfigureTestDatabase(connection = EmbeddedDatabaseConnection.H2)
class LocationRepositoryTest {

    @Autowired
    private LocationRepository locationRepository;

    @Test
    void save_ShouldSaveLocation() {
        Location location = Location.builder()
                .name("Lea")
                .url("URL1")
                .isActive(true)
                .build();

        Location savedLocation = locationRepository.save(location);

        assertNotNull(savedLocation);
        assertNotNull(savedLocation.getId());
    }
}

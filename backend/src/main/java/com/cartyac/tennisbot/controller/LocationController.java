package com.cartyac.tennisbot.controller;

import com.cartyac.tennisbot.dto.location.LocationRequestDTO;
import com.cartyac.tennisbot.dto.location.LocationResponseDTO;
import com.cartyac.tennisbot.model.Location;
import com.cartyac.tennisbot.service.api.LocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/locations")
public class LocationController {

    private final LocationService locationService;

    @Autowired
    public LocationController(LocationService locationService) {
        this.locationService = locationService;
    }

    @GetMapping
    public List<Location> getAllLocations() {
        return locationService.findAll();
    }

    @GetMapping("/active")
    public List<Location> getAllActiveLocations() {
        return locationService.findAllActive();
    }

    @GetMapping("/{id}")
    public ResponseEntity<LocationResponseDTO> getLocationById(@PathVariable UUID id) {
        Location location = locationService.findById(id);
        return ResponseEntity.ok(new LocationResponseDTO(location));
    }

    @PostMapping
    public ResponseEntity<LocationResponseDTO> createLocation(@RequestBody LocationRequestDTO locationRequest) {
        Location location = locationRequest.toEntity();
        location.setActive(true);
        Location savedLocation = locationService.save(location);
        return ResponseEntity.ok(new LocationResponseDTO(savedLocation));
    }

    @PutMapping("/{id}")
    public ResponseEntity<LocationResponseDTO> updateLocation(@PathVariable UUID id, @RequestBody Location location) {
        Location updatedLocation = locationService.update(id, location);
        return ResponseEntity.ok(new LocationResponseDTO(updatedLocation));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLocation(@PathVariable UUID id) {
        locationService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}

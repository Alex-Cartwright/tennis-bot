package com.cartyac.tennisbot.controller;

import com.cartyac.tennisbot.model.Location;
import com.cartyac.tennisbot.service.LocationService;
import org.springframework.beans.factory.annotation.Autowired;
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

    @GetMapping("/{id}")
    public Location getLocationById(@PathVariable UUID id) {
        return locationService.findById(id);
    }

    @PostMapping
    public Location createLocation(@RequestBody Location location) {
        location.setId(UUID.randomUUID());
        return locationService.save(location);
    }

    @PutMapping("/{id}")
    public Location updateLocation(@PathVariable UUID id, @RequestBody Location location) {
        location.setId(id);
        return locationService.save(location);
    }

    @DeleteMapping("/{id}")
    public void deleteLocation(@PathVariable UUID id) {
        locationService.deleteById(id);
    }
}

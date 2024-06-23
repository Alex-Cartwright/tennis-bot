package com.cartyac.tennisbot.service;

import com.cartyac.tennisbot.model.Location;
import com.cartyac.tennisbot.repository.LocationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class LocationService {

    @Autowired
    private LocationRepository locationRepository;

    public List<Location> findAll(){
        return locationRepository.findAll();
    }

    public Location findById(UUID id) {
        return locationRepository.findById(id).orElse(null);
    }

    public Location save(Location location) {
        return locationRepository.save(location);
    }

    public void deleteById(UUID id) {
        locationRepository.deleteById(id);
    }
}

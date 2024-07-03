package com.cartyac.tennisbot.service;

import com.cartyac.tennisbot.model.Location;
import com.cartyac.tennisbot.repository.LocationRepository;
import com.cartyac.tennisbot.repository.ScheduleRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class LocationServiceImpl implements LocationService {
    private final LocationRepository locationRepository;
    private final ScheduleRepository scheduleRepository;

    @Autowired
    public LocationServiceImpl(
            LocationRepository locationRepository,
            ScheduleRepository scheduleRepository
    ) {
        this.locationRepository = locationRepository;
        this.scheduleRepository = scheduleRepository;
    }

    @Override
    public List<Location> findAll(){
        return locationRepository.findAll();
    }

    @Override
    public Location findById(UUID id) {
        return locationRepository.findById(id).orElse(null);
    }

    @Override
    public Location save(Location location) {
        return locationRepository.save(location);
    }

    @Override
    public void deleteById(UUID id) {
        Location location = locationRepository.findById(id).orElseThrow(() ->
                new EntityNotFoundException(String.format("Location with id %s not found", id))
        );

        boolean bookingsExist = scheduleRepository.existsByLocation(location);

        if(bookingsExist) {
            softDelete(location);
        } else {
            locationRepository.deleteById(id);
        }
    }

    private void softDelete(Location location) {
        location.setActive(false);
        locationRepository.save(location);
    }
}

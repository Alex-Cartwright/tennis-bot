package com.cartyac.tennisbot.service.impl;

import com.cartyac.tennisbot.model.Location;
import com.cartyac.tennisbot.repository.LocationRepository;
import com.cartyac.tennisbot.repository.BookingRepository;
import com.cartyac.tennisbot.service.api.LocationService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@Transactional
public class LocationServiceImpl implements LocationService {
    private final LocationRepository locationRepository;
    private final BookingRepository bookingRepository;

    @Autowired
    public LocationServiceImpl(
            LocationRepository locationRepository,
            BookingRepository bookingRepository
    ) {
        this.locationRepository = locationRepository;
        this.bookingRepository = bookingRepository;
    }

    @Override
    public List<Location> findAll(){
        return locationRepository.findAll();
    }

    @Override
    public List<Location> findAllActive() {
        return locationRepository.findAllByIsActiveTrue();
    }

    @Override
    public Location findById(UUID id) {
        return locationRepository.findById(id).orElseThrow(() ->
                new EntityNotFoundException(String.format("Location with id %s not found", id))
        );
    }

    @Override
    public Location save(Location location) {
        return locationRepository.save(location);
    }

    @Override
    public Location update(UUID id, Location locationUpdate) {
        Location location = locationRepository.findById(id).orElseThrow(() ->
                new EntityNotFoundException(String.format("Location with id %s not found", id))
        );

        location.setName(locationUpdate.getName());
        location.setUrl(locationUpdate.getUrl());
        location.setActive(locationUpdate.isActive());
    }

    @Override
    public void deleteById(UUID id) {
        Location location = locationRepository.findById(id).orElseThrow(() ->
                new EntityNotFoundException(String.format("Location with id %s not found", id))
        );

        boolean bookingsExist = bookingRepository.existsByLocation(location);

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

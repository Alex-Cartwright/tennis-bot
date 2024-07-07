package com.cartyac.tennisbot.service.api;

import com.cartyac.tennisbot.model.Location;

import java.util.List;
import java.util.UUID;

public interface LocationService {

    Location findById(UUID id);
    List<Location> findAll();
    List<Location> findAllActive();
    Location save(Location location);
    Location update(UUID id, Location location);
    void deleteById(UUID id);


}

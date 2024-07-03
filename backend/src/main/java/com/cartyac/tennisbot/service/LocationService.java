package com.cartyac.tennisbot.service;

import com.cartyac.tennisbot.model.Location;

import java.util.List;
import java.util.UUID;

public interface LocationService {

    Location findById(UUID id);
    List<Location> findAll();

}

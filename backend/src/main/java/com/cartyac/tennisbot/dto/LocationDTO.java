package com.cartyac.tennisbot.dto;

import com.cartyac.tennisbot.model.Location;

import java.util.UUID;

public record LocationDTO(UUID id, String name, String url) {
    public static LocationDTO map(Location location) {
        return new LocationDTO(location.getId(), location.getName(), location.getUrl());
    }
}

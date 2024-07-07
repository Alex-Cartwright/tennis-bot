package com.cartyac.tennisbot.dto.location;

import com.cartyac.tennisbot.model.Location;

import java.util.UUID;

public record LocationResponseDTO(
        UUID id,
        String name,
        String url,
        boolean isActive
) {
    public LocationResponseDTO(Location location){
        this(
                location.getId(),
                location.getName(),
                location.getUrl(),
                location.isActive()
        );
    }
}

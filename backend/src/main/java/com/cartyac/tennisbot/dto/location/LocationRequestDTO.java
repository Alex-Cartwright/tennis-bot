package com.cartyac.tennisbot.dto.location;

import com.cartyac.tennisbot.model.Location;

public record LocationRequestDTO(String name, String url) {
    public Location toEntity() {
        return Location.builder()
                .name(name)
                .url(url)
                .build();
    }
}

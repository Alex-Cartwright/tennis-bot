package com.cartyac.tennisbot.dto.location;

import com.cartyac.tennisbot.model.Location;

import javax.annotation.Nullable;
import java.util.UUID;

public record LocationRequestDTO(@Nullable UUID id, String name, String url) {
    public Location toEntity() {
        return Location.builder()
                .id(id)
                .name(name)
                .url(url)
                .build();
    }
}

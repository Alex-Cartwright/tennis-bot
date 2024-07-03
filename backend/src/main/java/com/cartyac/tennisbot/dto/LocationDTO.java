package com.cartyac.tennisbot.dto;

import lombok.Builder;
import lombok.Data;

import java.util.UUID;

@Data
@Builder
public class LocationDTO {
    private UUID id;
    private String name;
    private String url;
}

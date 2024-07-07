package com.cartyac.tennisbot.model;

import com.cartyac.tennisbot.dto.location.LocationRequestDTO;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Entity
@Table(name = "locations")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Location {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;
    private String name;
    private String url;
    // Tracks soft deletion of locations
    private boolean isActive;

    public Location(LocationRequestDTO locationRequestDTO) {
        this.id = locationRequestDTO.id();
        this.name = locationRequestDTO.name();
        this.url = locationRequestDTO.url();
        isActive = true;
    }
}


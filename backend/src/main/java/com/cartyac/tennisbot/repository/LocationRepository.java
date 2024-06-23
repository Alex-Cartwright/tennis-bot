package com.cartyac.tennisbot.repository;

import com.cartyac.tennisbot.model.Location;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface LocationRepository extends JpaRepository<Location, UUID> {
}
package com.example.shop.repo;

import com.example.shop.model.Manufacturer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ManufacturerRepository extends JpaRepository<Manufacturer, Long> {
    @Query("SELECT DISTINCT m.name FROM Manufacturer m JOIN m.products p WHERE p.category.id = :categoryId")
    List<String> findManufacturerNamesByCategoryId(@Param("categoryId") Long categoryId);
    @Query("SELECT DISTINCT m.name FROM Manufacturer m")
    List<String> findAllManufacturerNames();
}

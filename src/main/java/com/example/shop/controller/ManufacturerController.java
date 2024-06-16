package com.example.shop.controller;

import com.example.shop.model.Manufacturer;
import com.example.shop.service.ManufacturerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/manufacturers")
public class ManufacturerController {

    private final ManufacturerService manufacturerService;

    @Autowired
    public ManufacturerController(ManufacturerService manufacturerService) {
        this.manufacturerService = manufacturerService;
    }

    @GetMapping
    public List<String> getManufacturersByCategory(@RequestParam("categoryId") Long categoryId) {
        return manufacturerService.getManufacturerNamesByCategory(categoryId);
    }
    @GetMapping("/all")
    public List<String> getAllManu() {
        return manufacturerService.getAllManu();
    }
}

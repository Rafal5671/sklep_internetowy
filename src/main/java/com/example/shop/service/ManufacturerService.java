package com.example.shop.service;

import com.example.shop.model.Manufacturer;
import com.example.shop.repo.ManufacturerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ManufacturerService {

    private final ManufacturerRepository manufacturerRepository;

    @Autowired
    public ManufacturerService(ManufacturerRepository manufacturerRepository) {
        this.manufacturerRepository = manufacturerRepository;
    }

    public List<String> getManufacturerNamesByCategory(Long categoryId) {
        return manufacturerRepository.findManufacturerNamesByCategoryId(categoryId);
    }
    public List<String> getAllManu()
    {
        return manufacturerRepository.findAllManufacturerNames();
    }
}

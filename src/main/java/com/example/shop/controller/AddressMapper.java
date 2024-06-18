package com.example.shop.controller;

import com.example.shop.dto.AddressDTO;
import com.example.shop.model.Address;

public class AddressMapper {
    public static AddressDTO toDTO(Address address) {
        if (address == null) {
            return null;
        }

        AddressDTO dto = new AddressDTO();
        dto.setId(address.getId());
        dto.setCity(address.getCity());
        dto.setStreet(address.getStreet());
        dto.setPostalCode(address.getPostalCode());
        return dto;
    }
}


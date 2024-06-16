package com.example.shop.controller;

import com.example.shop.DTO.UserDTO;
import com.example.shop.model.User;

public class UserMapper {
    public static UserDTO toDTO(User user) {
        UserDTO dto = new UserDTO();
        dto.setId(user.getId());
        dto.setEmail(user.getEmail());
        // ustaw inne pola...
        return dto;
    }
}

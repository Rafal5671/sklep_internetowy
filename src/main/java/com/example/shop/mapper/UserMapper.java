package com.example.shop.mapper;

import com.example.shop.dto.UserDTO;
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

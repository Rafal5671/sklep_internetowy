package com.example.shop.model;

import com.example.shop.dto.UserLoginDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoginResponse {
    private String message;
    private boolean status;
    private UserLoginDto user;
}
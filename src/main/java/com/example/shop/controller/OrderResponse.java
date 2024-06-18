package com.example.shop.controller;

import com.example.shop.model.Orders;
import com.example.shop.model.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class OrderResponse {
    private Orders order;
    private User user;
}

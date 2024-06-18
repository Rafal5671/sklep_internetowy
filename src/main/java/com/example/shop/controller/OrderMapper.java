package com.example.shop.controller;

import com.example.shop.dto.OrderDto;
import com.example.shop.dto.OrderProductDto;
import com.example.shop.model.OrderProduct;
import com.example.shop.model.Orders;

import java.util.ArrayList;
import java.util.List;

public class OrderMapper {
    public static OrderDto toDTO(Orders order) {
        if (order == null) {
            return null;
        }

        OrderDto dto = new OrderDto();
        dto.setId(order.getId());
        dto.setTotalPrice(order.getTotalPrice());
        dto.setOrderDate(order.getOrderDate());
        dto.setShipDate(order.getShipDate());
        dto.setState(order.getState());
        dto.setType(order.getType());
        dto.setUser(UserMapper.toDTO(order.getUser()));
        dto.setAddress(AddressMapper.toDTO(order.getAddress()));

        List<OrderProductDto> orderProductDTOs = new ArrayList<>();
        for (OrderProduct orderProduct : order.getOrderProducts()) {
            orderProductDTOs.add(OrderProductMapper.toDTO(orderProduct));
        }
        dto.setOrderProducts(orderProductDTOs);

        return dto;
    }
}


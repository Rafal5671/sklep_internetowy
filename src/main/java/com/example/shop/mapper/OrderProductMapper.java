package com.example.shop.mapper;

import com.example.shop.dto.OrderProductDto;
import com.example.shop.model.OrderProduct;

public class OrderProductMapper {
    public static OrderProductDto toDTO(OrderProduct orderProduct) {
        OrderProductDto dto = new OrderProductDto();
        dto.setId(orderProduct.getId());
        dto.setProduct(ProductMapper.toDTO(orderProduct.getProduct()));
        dto.setQuantity(orderProduct.getQuantity());
        return dto;
    }
}

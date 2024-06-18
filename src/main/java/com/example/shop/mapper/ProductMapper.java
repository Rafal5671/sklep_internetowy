package com.example.shop.mapper;

import com.example.shop.dto.ProductDTO;
import com.example.shop.model.Product;

public class ProductMapper {
    public static ProductDTO toDTO(Product product) {
        ProductDTO dto = new ProductDTO();
        dto.setId(product.getId());
        dto.setName(product.getProductName());
        dto.setPrice(product.getPrice());
        dto.setImage(product.getImage());
        return dto;
    }
}

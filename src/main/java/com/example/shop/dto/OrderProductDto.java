package com.example.shop.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrderProductDto {
    private Long id;
    private ProductDTO product;
    private int quantity;
    private String imagePath;
}


package com.example.shop.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProductManufacturerDto {
    private Long id;
    private String productName;
    private float price;
    private String manufacturerName;
    private String image;
    private Float promoPrice;
    private String categoryName;
    private int quantity;

    public ProductManufacturerDto(Long id, String productName, float price, String manufacturerName, String image, Float promoPrice, String categoryName,int quantity) {
        this.id = id;
        this.productName = productName;
        this.price = price;
        this.manufacturerName = manufacturerName;
        this.image = image;
        this.promoPrice = promoPrice != null ? promoPrice : 0.0f;
        this.categoryName = categoryName;
        this.quantity = quantity;
    }
}

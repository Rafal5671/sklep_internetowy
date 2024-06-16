package com.example.shop.DTO;

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
    private String categoryName;  // New field

    // Constructor
    public ProductManufacturerDto(Long id, String productName, float price, String manufacturerName, String image, Float promoPrice, String categoryName) {
        this.id = id;
        this.productName = productName;
        this.price = price;
        this.manufacturerName = manufacturerName;
        this.image = image;
        this.promoPrice = promoPrice != null ? promoPrice : 0.0f;
        this.categoryName = categoryName;  // Initialize the new field
    }
}

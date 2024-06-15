package com.example.shop.DTO;

public class ProductDTO {
    private Long id;
    private String name;
    private String image;
    private double price;
    private double discountedPrice;

    // Constructors, getters, and setters

    public ProductDTO() {
    }

    public ProductDTO(Long id, String name, String image, double price, double discountedPrice) {
        this.id = id;
        this.name = name;
        this.image = image;
        this.price = price;
        this.discountedPrice = discountedPrice;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public double getDiscountedPrice() {
        return discountedPrice;
    }

    public void setDiscountedPrice(double discountedPrice) {
        this.discountedPrice = discountedPrice;
    }
}

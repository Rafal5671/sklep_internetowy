package com.example.shop.dto;

import com.example.shop.model.Product;
import java.util.List;

public class CategoryProductsDTO {
    private String categoryName;
    private List<Product> products;

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public List<Product> getProducts() {
        return products;
    }

    public void setProducts(List<Product> products) {
        this.products = products;
    }
}

package com.example.shop.controller;

import com.example.shop.dto.ProductManufacturerDto;
import com.example.shop.model.Product;
import com.example.shop.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping("/search")
    public List<ProductManufacturerDto> searchProducts(@RequestParam String query) {
        List<Product> products = productService.searchProducts(query);
        return products.stream()
                .map(product -> new ProductManufacturerDto(
                        product.getId(),
                        product.getProductName(),
                        product.getPrice(),
                        product.getManufacturer().getName(),
                        product.getImage(),
                        product.getCutPrice(),
                        product.getCategory().getCategoryName(),
                        product.getQuantity()
                ))
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Long id) {
        Product product = productService.getProductById(id);
        return ResponseEntity.ok(product);
    }

    @GetMapping
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }

    @PostMapping("/add")
    public ResponseEntity<Product> addProduct(@RequestBody Product product) {
        Product savedProduct = productService.addProduct(product);
        return ResponseEntity.ok(savedProduct);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }
}

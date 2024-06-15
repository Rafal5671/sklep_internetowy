package com.example.shop.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "products")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "product_id")
    private Long id;

    @Column(name = "product_name", nullable = false)
    private String productName;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "manufacturer_id")
    private Manufacturer manufacturer;

    private float price;

    private String image;

    @Column(name = "cut_price")
    private Float cutPrice;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
    private List<ProductTranslation> translations;
}

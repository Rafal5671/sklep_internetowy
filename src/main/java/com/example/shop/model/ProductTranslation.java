package com.example.shop.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "product_translations")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class ProductTranslation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "translation_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @Column(name = "language", nullable = false)
    private String language;

    @Column(name = "product_name", nullable = false)
    private String productName;

    @Column(columnDefinition = "TEXT")
    private String description;
}

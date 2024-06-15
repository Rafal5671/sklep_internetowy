package com.example.shop.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "manufacturers")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class Manufacturer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "manufacturer_id")
    private Long id;

    @Column(name = "manufacturer_name", nullable = false)
    private String name;

    @OneToMany(mappedBy = "manufacturer")
    private List<Product> products;
}

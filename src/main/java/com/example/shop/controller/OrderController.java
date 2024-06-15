package com.example.shop.controller;

import com.example.shop.model.*;
import com.example.shop.repo.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/order")
public class OrderController {
    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private AddressRepository addressRepository;

    @Autowired
    private OrderDetailsRepository orderDetailsRepository;

    @PostMapping("/create")
    public ResponseEntity<Orders> createOrder(@RequestBody OrderRequest orderRequest) {
        // Find the user based on the email provided in the request
        User user = userRepository.findByEmail(orderRequest.getEmail());
        if (user == null) {
            return ResponseEntity.badRequest().build();
        }

        // Create the order
        Orders order = Orders.builder()
                .user(user)
                .state(true)
                .totalPrice(orderRequest.getTotalPrice())
                .orderProducts(new ArrayList<>())  // Initialize orderProducts explicitly
                .build();

        // Add order products
        for (OrderProductRequest orderProductRequest : orderRequest.getProducts()) {
            Product product = productRepository.findById(orderProductRequest.getProductId())
                    .orElseThrow(() -> new IllegalArgumentException("Invalid product ID: " + orderProductRequest.getProductId()));
            OrderProduct orderProduct = OrderProduct.builder()
                    .orders(order)
                    .product(product)
                    .quantity(orderProductRequest.getQuantity())
                    .build();
            order.getOrderProducts().add(orderProduct);
        }

        // Save the order
        // Save the order
        Orders savedOrder = orderRepository.save(order);

        // Create order details
        Address address = Address.builder()
                .city(orderRequest.getCity())
                .street(orderRequest.getStreet())
                .postalCode(orderRequest.getPostalCode())
                .user(user)
                .build();
        address = addressRepository.save(address);

        OrderDetails orderDetails = OrderDetails.builder()
                .orders(savedOrder)
                .orderDate(LocalDateTime.now())
                .state(OrderState.PENDING)
                .type(PaymentStatus.UNPAID)
                .address(address)
                .build();

        orderDetailsRepository.save(orderDetails);

        return ResponseEntity.ok(savedOrder);
    }
}
@Getter
@Setter
class OrderRequest {
    private List<OrderProductRequest> products;
    private float totalPrice;
    private String email;
    private String city;  // New address fields
    private String street;
    private String postalCode;
    // getters and setters
}

@Getter
@Setter
class OrderProductRequest {
    private Long productId;
    private int quantity;
    // getters and setters
}


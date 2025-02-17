package com.example.shop.controller;

import com.example.shop.dto.OrderDto;
import com.example.shop.mapper.OrderMapper;
import com.example.shop.model.*;
import com.example.shop.repo.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

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

    @PostMapping("/create")
    @Transactional
    public ResponseEntity<Orders> createOrder(@RequestBody OrderRequest orderRequest) {
        User user = userRepository.findByEmail(orderRequest.getEmail());
        if (user == null) {
            return ResponseEntity.badRequest().build();
        }

        Address address = Address.builder()
                .city(orderRequest.getCity())
                .street(orderRequest.getStreet())
                .postalCode(orderRequest.getPostalCode())
                .user(user)
                .build();
        address = addressRepository.save(address);

        Orders order = Orders.builder()
                .user(user)
                .totalPrice(orderRequest.getTotalPrice())
                .orderProducts(new ArrayList<>())
                .orderDate(LocalDateTime.now())
                .state(OrderState.PENDING)
                .type(PaymentStatus.PAID)
                .address(address)
                .build();

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

        Orders savedOrder = orderRepository.save(order);

        return ResponseEntity.ok(savedOrder);
    }

    @GetMapping("/all")
    public ResponseEntity<List<OrderDto>> getAllOrders(@RequestParam String email) {
        User user = userRepository.findByEmail(email);
        if (user == null) {
            return ResponseEntity.badRequest().build();
        }

        List<Orders> orders = orderRepository.findByUser(user);

        List<OrderDto> orderDTOs = new ArrayList<>();
        for (Orders order : orders) {
            orderDTOs.add(OrderMapper.toDTO(order));
        }

        return ResponseEntity.ok(orderDTOs);
    }
    @GetMapping("/all-orders")
    public ResponseEntity<List<OrderDto>> getAllOrders() {
        List<Orders> orders = orderRepository.findAll();

        List<OrderDto> orderDTOs = new ArrayList<>();
        for (Orders order : orders) {
            orderDTOs.add(OrderMapper.toDTO(order));
        }

        return ResponseEntity.ok(orderDTOs);
    }
    @PatchMapping("/update/{id}")
    public ResponseEntity<Orders> updateOrderState(@PathVariable Long id, @RequestBody UpdateOrderRequest updateOrderRequest) {
        Orders order = orderRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Invalid order ID: " + id));
        order.setState(updateOrderRequest.getState());
        Orders updatedOrder = orderRepository.save(order);
        return ResponseEntity.ok(updatedOrder);
    }
}

@Getter
@Setter
class OrderRequest {
    private List<OrderProductRequest> products;
    private float totalPrice;
    private String email;
    private String city;
    private String street;
    private String postalCode;
}

@Getter
@Setter
class OrderProductRequest {
    private Long productId;
    private int quantity;
}
@Getter
@Setter
class UpdateOrderRequest {
    private OrderState state;
}
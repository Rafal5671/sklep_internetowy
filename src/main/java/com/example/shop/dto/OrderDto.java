package com.example.shop.DTO;

import com.example.shop.model.OrderState;
import com.example.shop.model.PaymentStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrderDto {
    private Long id;
    private Float totalPrice;
    private LocalDateTime orderDate;
    private LocalDateTime shipDate;
    private OrderState state;
    private PaymentStatus type;
    private UserDTO user;
    private List<OrderProductDto> orderProducts;
    private AddressDTO address;
}

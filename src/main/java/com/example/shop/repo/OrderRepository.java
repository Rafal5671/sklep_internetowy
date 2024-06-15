package com.example.shop.repo;

import com.example.shop.model.Orders;
import com.example.shop.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Orders, Long> {
    Orders findByUserAndState(User user, Boolean state);
}

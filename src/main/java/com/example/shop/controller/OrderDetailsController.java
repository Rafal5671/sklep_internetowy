package com.example.shop.controller;

import com.example.shop.DTO.OrderDetailsRequest;
import com.example.shop.model.*;
import com.example.shop.repo.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/order")
public class OrderDetailsController {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderDetailsRepository orderDetailsRepository;

    @Autowired
    private AddressRepository addressRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductRepository productRepository;

    @PostMapping
    public ResponseEntity<?> createOrderDetails(@RequestBody OrderDetailsRequest request) {
        User user = userRepository.findByEmail(request.getEmail());

        if (user == null) {
            return ResponseEntity.status(401).body("User not authenticated");
        }

        Optional<Orders> optionalBasket = orderRepository.findById(request.getBasketId());
        if (optionalBasket.isEmpty() || !optionalBasket.get().getUser().equals(user)) {
            return ResponseEntity.status(404).body("Basket not found or does not belong to the user");
        }
        Orders orders = optionalBasket.get();

        Address address = new Address();
        address.setCity(request.getAddress().getCity());
        address.setStreet(request.getAddress().getStreet());
        address.setPostalCode(request.getAddress().getPostalCode());
        address.setUser(user);
        addressRepository.save(address);

        OrderDetails orderDetails = new OrderDetails();
        orderDetails.setOrders(orders);
        orderDetails.setOrderDate(LocalDateTime.now());
        orderDetails.setShipDate(null); // or set the ship date based on your logic
        orderDetails.setState(OrderState.PENDING); // or set the appropriate state
        orderDetails.setType(PaymentStatus.UNPAID); // or set the appropriate payment type
        orderDetails.setAddress(address);

        // Save order details
        orderDetailsRepository.save(orderDetails);

        // Add products to the basket and update total price
        float totalPrice = 0.0f;
        for (OrderDetailsRequest.ProductDTO productDTO : request.getProducts()) {
            Optional<Product> optionalProduct = productRepository.findById(productDTO.getProductId());
            if (optionalProduct.isPresent()) {
                Product product = optionalProduct.get();
                int quantity = productDTO.getQuantity();

                // Check if the product already exists in the basket
                Optional<OrderProduct> optionalBasketProduct = orders.getOrderProducts().stream()
                        .filter(bp -> bp.getProduct().getId().equals(product.getId()))
                        .findFirst();

                OrderProduct orderProduct;
                if (optionalBasketProduct.isPresent()) {
                    orderProduct = optionalBasketProduct.get();
                    orderProduct.setQuantity(orderProduct.getQuantity() + quantity);
                } else {
                    orderProduct = new OrderProduct();
                    orderProduct.setOrders(orders);
                    orderProduct.setProduct(product);
                    orderProduct.setQuantity(quantity);
                    orders.getOrderProducts().add(orderProduct);
                }

                totalPrice += product.getPrice() * quantity;
            }
        }
        orders.setTotalPrice(totalPrice);
        orders.setState(true);
        orderRepository.save(orders);

        // Create a new basket for the user
        Orders newOrders = new Orders();
        newOrders.setUser(user);
        newOrders.setState(false);
        newOrders.setTotalPrice(0.0f);
        orderRepository.save(newOrders);

        return ResponseEntity.ok(orderDetails);
    }

    @PatchMapping("/update-payment-status/{basketId}")
    public ResponseEntity<?> updatePaymentStatus(@PathVariable Long basketId, @RequestBody Map<String, String> payload) {
        String paymentStatus = payload.get("paymentStatus");
        Optional<Orders> optionalBasket = orderRepository.findById(basketId);

        if (optionalBasket.isEmpty()) {
            return ResponseEntity.status(404).body("Basket not found");
        }

        Orders orders = optionalBasket.get();
        OrderDetails orderDetails = orderDetailsRepository.findByOrders(orders);

        if (orderDetails == null) {
            return ResponseEntity.status(404).body("OrderDetails not found for the given basket");
        }

        if (paymentStatus != null && paymentStatus.equals("PAID")) {
            orderDetails.setType(PaymentStatus.PAID);
            orderDetailsRepository.save(orderDetails);
            return ResponseEntity.ok(orderDetails);
        } else {
            return ResponseEntity.status(400).body("Invalid payment status");
        }
    }

    @GetMapping("/all")
    public List<OrderDetails> getAllOrders() {
        return orderDetailsRepository.findAll();
    }

    @PatchMapping("/update/{id}")
    public ResponseEntity<OrderDetails> updateOrderStatus(@PathVariable Long id, @RequestBody Map<String, OrderState> payload) {
        OrderState state = payload.get("state");
        Optional<OrderDetails> optionalOrder = orderDetailsRepository.findById(id);
        if (optionalOrder.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        OrderDetails orderDetails = optionalOrder.get();
        orderDetails.setState(state);
        if (state == OrderState.SHIPPED) {
            orderDetails.setShipDate(LocalDateTime.now());
        }
        orderDetailsRepository.save(orderDetails);
        return ResponseEntity.ok(orderDetails);
    }

}

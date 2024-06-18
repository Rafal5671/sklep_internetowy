package com.example.shop.service;

import com.example.shop.dto.UserDTO;
import com.example.shop.model.User;
import com.example.shop.model.UserType;
import com.example.shop.repo.OrderRepository;
import com.example.shop.repo.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final OrderRepository orderRepository;

    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, OrderRepository orderRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.orderRepository = orderRepository;
    }

    public User createUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setUserType(UserType.USER);
        return userRepository.save(user);
    }

    public User authenticate(String email, String password) {
        User user = userRepository.findByEmail(email);
        if (user != null && passwordEncoder.matches(password, user.getPassword())) {
            return user;
        }
        return null;
    }

    public List<UserDTO> getAllUsers() {
        List<User> users = userRepository.findAll();
        return users.stream().map(this::convertToDTO).collect(Collectors.toList());
    }
    private UserDTO convertToDTO(User user) {
        UserDTO userDTO = new UserDTO();
        userDTO.setId(user.getId());
        userDTO.setEmail(user.getEmail());
        userDTO.setName(user.getName());
        userDTO.setLastName(user.getLastName());
        userDTO.setPhone(user.getPhone());
        userDTO.setPassword(user.getPassword());
        return userDTO;
    }
    public User getUserById(Long id) {
        return userRepository.findById(id).orElse(null);
    }
    public void deleteUser(Long id) {
        User user = userRepository.findById(id).orElseThrow(() -> new UsernameNotFoundException("User not found"));
        orderRepository.deleteAll(user.getOrders());
        userRepository.deleteById(id);
    }
    public boolean isAdmin(String email) {
        User user = userRepository.findByEmail(email);
        return user != null && user.getUserType() == UserType.ADMIN;
    }
}

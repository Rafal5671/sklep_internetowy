package com.example.shop.controller;

import com.example.shop.DTO.UserDTO;
import com.example.shop.DTO.UserLoginDto;
import com.example.shop.DTO.UserSummaryDto;
import com.example.shop.model.ApiResponse;
import com.example.shop.model.LoginResponse;
import com.example.shop.model.User;
import com.example.shop.service.UserService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/api")
    public ApiResponse homeController() {
        ApiResponse res = new ApiResponse();
        res.setMessage("Welcome to API");
        res.setStatus(true);
        return res;
    }

    @PostMapping("/api/register")
    public ResponseEntity<User> registerUser(@RequestBody User user) {
        User savedUser = userService.createUser(user);
        return ResponseEntity.ok(savedUser);
    }

    @PostMapping("/api/login")
    public ResponseEntity<LoginResponse> loginUser(@RequestBody User loginRequest, HttpSession session) {
        User user = userService.authenticate(loginRequest.getEmail(), loginRequest.getPassword());
        LoginResponse response = new LoginResponse();
        if (user != null) {
            session.setAttribute("user", user);
            response.setMessage("Login successful");
            response.setStatus(true);
            UserLoginDto userDTO = new UserLoginDto(user.getId(), user.getName(), user.getLastName(), user.getEmail(), user.getPhone(), user.getUserType());
            response.setUser(userDTO);
            System.out.println("Authenticated User: " + user.getUserType());
            return ResponseEntity.ok(response);
        } else {
            response.setMessage("Invalid email or password");
            response.setStatus(false);
            return ResponseEntity.status(401).body(response);
        }
    }
    @GetMapping("/check-admin")
    public ResponseEntity<Boolean> checkAdmin(@RequestParam String email) {
        boolean isAdmin = userService.isAdmin(email);
        return ResponseEntity.ok(isAdmin);
    }
    @GetMapping("/api/logout")
    public ResponseEntity<ApiResponse> logoutUser(HttpSession session) {
        session.invalidate();
        ApiResponse response = new ApiResponse();
        response.setMessage("Logout successful");
        response.setStatus(true);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/api/user")
    public ResponseEntity<User> getUser(HttpSession session) {
        User user = (User) session.getAttribute("user");
        if (user != null) {
            return ResponseEntity.ok(user);
        }
        return ResponseEntity.status(401).build();
    }

    @GetMapping("/api/users")
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        List<UserDTO> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @DeleteMapping("/api/users/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
    @GetMapping("/api/user-data/{id}")
    public UserSummaryDto getUserById(@PathVariable Long id) {
        User user = userService.getUserById(id);
        UserSummaryDto userSummaryDto = new UserSummaryDto();
        userSummaryDto.setId(user.getId());
        userSummaryDto.setName(user.getName());
        userSummaryDto.setEmail(user.getEmail());
        userSummaryDto.setPhone(user.getPhone());
        return userSummaryDto;
    }
}

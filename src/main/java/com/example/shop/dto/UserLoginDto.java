package com.example.shop.dto;

import com.example.shop.model.UserType;

public class UserLoginDto {
    private Long id;
    private String name;
    private String lastName;
    private String email;
    private int phone;
    private UserType userType;

    public UserLoginDto(Long id, String name, String lastName, String email, int phone, UserType userType) {
        this.id = id;
        this.name = name;
        this.lastName = lastName;
        this.email = email;
        this.phone = phone;
        this.userType = userType;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public int getPhone() {
        return phone;
    }

    public void setPhone(int phone) {
        this.phone = phone;
    }

    public UserType getUserType() {
        return userType;
    }

    public void setUserType(UserType userType) {
        this.userType = userType;
    }
}

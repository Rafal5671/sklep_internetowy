package com.example.shop.dto;

public class UserSummaryDto {
    private Long id;
    private String name;
    private String lastName;
    private String email;


    private int phone;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
    public int getPhone() {
        return phone;
    }

    public void setPhone(int phone) {
        this.phone = phone;
    }
    public String getName() {
        return name;
    }

    public void setLastName(String name) {
        this.lastName = name;
    }
    public String getLastName() {
        return lastName;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}

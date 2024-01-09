package com.project.ecommercebackend.api.model;

import jakarta.persistence.Column;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class GuestBody {
    @NotNull
    @NotBlank
    private String email;

    @NotNull
    @NotBlank
    private String address;

    @NotNull
    @NotBlank
    private String city;

    @NotNull
    @NotBlank
    private String country;

    public String getEmail() {
        return email;
    }

    public String getAddress() {
        return address;
    }

    public String getCity() {
        return city;
    }

    public String getCountry() {
        return country;
    }
}

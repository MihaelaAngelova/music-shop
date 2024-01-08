package com.project.ecommercebackend.api.model;

import com.project.ecommercebackend.model.ProductType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class ProductBody {
    @NotNull
    @NotBlank
    private String name;
    @NotNull
    @NotBlank
    private String description;
    @NotNull
    private Double price;
    @NotNull
    private ProductType type;
    @NotNull
    private Integer quantity;

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public Double getPrice() {
        return price;
    }

    public ProductType getType() {
        return type;
    }

    public Integer getQuantity() {
        return quantity;
    }
}

package com.project.ecommercebackend.api.model;

import jakarta.validation.constraints.NotNull;

public class ProductQuantityBody {
    @NotNull
    Long productId;
    @NotNull
    int quantity;

    public Long getProductId() {
        return productId;
    }

    public int getQuantity() {
        return quantity;
    }
}

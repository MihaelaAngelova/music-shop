package com.project.ecommercebackend.api.model;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class ProductQuantityPair {
    @NotNull
    private int productId;
    @Size(min = 1)
    @NotNull
    private int quantity;

    public int getProductId() {
        return productId;
    }

    public int getQuantity() {
        return quantity;
    }
}

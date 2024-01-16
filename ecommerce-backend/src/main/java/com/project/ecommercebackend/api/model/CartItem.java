package com.project.ecommercebackend.api.model;

import com.project.ecommercebackend.model.Product;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class CartItem {
    @NotNull
    private Product product;
    @Size(min = 1)
    @NotNull
    private int quantity;

    public Product getProduct() {
        return product;
    }

    public int getQuantity() {
        return quantity;
    }

    public CartItem(Product product, int quantity) {
        this.product = product;
        this.quantity = quantity;
    }
}

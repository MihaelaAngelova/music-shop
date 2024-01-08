package com.project.ecommercebackend.api.controller.cart;

import com.project.ecommercebackend.api.model.ProductQuantityPair;
import com.project.ecommercebackend.service.ProductService;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/cart")
public class CartController {
    private ProductService productService;

    public CartController(ProductService productService) {
        this.productService = productService;
    }

    @PostMapping("/add")
    public ResponseEntity postAddToCart(@RequestBody ProductQuantityPair productQuantityPair, HttpSession session) {
        if(!productService.decreaseQuantity(productQuantityPair.getProductId(), productQuantityPair.getQuantity())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        ArrayList<ProductQuantityPair> cart = (ArrayList<ProductQuantityPair>) session.getAttribute("Cart");
        if (cart == null) {
            cart = new ArrayList<>();
        }
        cart.add(productQuantityPair);
        session.setAttribute("Cart", cart);
        return ResponseEntity.ok().build();
    }
}

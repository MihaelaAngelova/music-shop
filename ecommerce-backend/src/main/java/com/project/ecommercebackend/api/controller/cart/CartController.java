package com.project.ecommercebackend.api.controller.cart;

import com.project.ecommercebackend.api.model.ProductQuantityPair;
import com.project.ecommercebackend.service.ProductService;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/cart")
public class CartController {
    private final static String CART = "Cart";
    private ProductService productService;

    public CartController(ProductService productService) {
        this.productService = productService;
    }

    @PostMapping("/add")
    public ResponseEntity postAddToCart(@RequestBody ProductQuantityPair productQuantityPair, HttpSession session) {
        if(!productService.decreaseQuantity(productQuantityPair.getProductId(), productQuantityPair.getQuantity())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        List<ProductQuantityPair> cart = (List<ProductQuantityPair>) session.getAttribute(CART);
        if (cart == null) {
            cart = new ArrayList<>();
        }
        cart.add(productQuantityPair);
        session.setAttribute(CART, cart);
        return ResponseEntity.ok().build();
    }

    @GetMapping
    public List<ProductQuantityPair> getCart(HttpSession session) {
        List<ProductQuantityPair> cart = (List<ProductQuantityPair>) session.getAttribute(CART);
        if(cart == null) {
            return new ArrayList<>();
        }
        return cart;
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteProductFromCart(@PathVariable int id, HttpSession session) {
        List<ProductQuantityPair> cart = (List<ProductQuantityPair>) session.getAttribute(CART);
        if(cart == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        boolean productExists = cart.stream()
                .anyMatch(pair -> pair.getProductId() == id);
        if(productExists) {
            cart = cart.stream().filter(pair -> pair.getProductId() != id).toList();
            session.setAttribute(CART, cart);
            return ResponseEntity.ok().build();
        } else return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
}

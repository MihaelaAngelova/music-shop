package com.project.ecommercebackend.api.controller.cart;

import com.project.ecommercebackend.api.model.GuestBody;
import com.project.ecommercebackend.api.model.ProductQuantityPair;
import com.project.ecommercebackend.model.Address;
import com.project.ecommercebackend.model.LocalUser;
import com.project.ecommercebackend.model.WebOrder;
import com.project.ecommercebackend.model.OrderElement;
import com.project.ecommercebackend.service.OrderService;
import com.project.ecommercebackend.service.ProductService;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/cart")
@CrossOrigin(origins = "http://localhost:63342", allowCredentials = "true")
public class CartController {
    private final static String CART = "Cart";
    private ProductService productService;
    private OrderService orderService;

    public CartController(ProductService productService, OrderService orderService) {
        this.productService = productService;
        this.orderService = orderService;
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
        cart = new ArrayList<>(cart);
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
            cart = cart.stream().filter(pair -> pair.getProductId() != id).collect(Collectors.toList());
            session.setAttribute(CART, cart);
            return ResponseEntity.ok().build();
        } else return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @DeleteMapping("/all")
    public ResponseEntity deleteCart(HttpSession session) {
        session.setAttribute(CART, new ArrayList<>());
        return ResponseEntity.ok().build();
    }

    @PostMapping("/payment")
    public ResponseEntity<WebOrder> payment(@AuthenticationPrincipal LocalUser user,
                                            HttpSession session,
                                            @RequestBody GuestBody guestBody) {
        String email;
        Address address;

        if(user != null) {
            email = user.getEmail();
            address = user.getAddress();
        } else {
            email = guestBody.getEmail();
            address = new Address(guestBody.getAddress(), guestBody.getCity(), guestBody.getCountry());
        }

        List<ProductQuantityPair> cart = (List<ProductQuantityPair>) session.getAttribute(CART);
        if(cart == null || cart.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        } else {
            WebOrder response = orderService.saveOrder(email, address, cart);
            if (response == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
            }

            session.setAttribute(CART, new ArrayList<>());
            return ResponseEntity.ok(response);
        }
    }
}

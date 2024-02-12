package com.project.ecommercebackend.api.controller.order;

import com.project.ecommercebackend.model.LocalUser;
import com.project.ecommercebackend.model.WebOrder;
import com.project.ecommercebackend.service.interfaces.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orders")
@CrossOrigin(origins = "http://localhost:63342", allowCredentials = "true")
public class OrderController {

    @Autowired
    OrderService orderService;

    @GetMapping()
    ResponseEntity<List<WebOrder>> getOrders(@AuthenticationPrincipal LocalUser user) {
        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        List<WebOrder> userOrders = orderService.getOrdersByEmail(user.getEmail());
        return ResponseEntity.ok(userOrders);
    }
}

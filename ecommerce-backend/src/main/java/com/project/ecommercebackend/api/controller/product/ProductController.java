package com.project.ecommercebackend.api.controller.product;

import com.project.ecommercebackend.api.model.ProductBody;
import com.project.ecommercebackend.model.LocalUser;
import com.project.ecommercebackend.model.Product;
import com.project.ecommercebackend.model.UserRole;
import com.project.ecommercebackend.service.ProductService;
import com.project.ecommercebackend.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/product")
public class ProductController {

    private ProductService productService;
    private UserService userService;

    public ProductController(ProductService productService, UserService userService) {
        this.productService = productService;
        this.userService = userService;
    }

    @GetMapping("/{id}")
    ResponseEntity<Product> getProduct(@PathVariable int id) {
        try{
            Product response = productService.getProduct(id);
            return ResponseEntity.ok(response);
        } catch(Exception ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @PostMapping
    ResponseEntity<Product> postProduct(@Valid @RequestBody ProductBody productBody,
                                        @AuthenticationPrincipal LocalUser user) {
        if(user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        UserRole userRole = user.getUserRole();
        if(userRole.equals(UserRole.ADMINISTRATOR)) {
            Product response = productService.createProduct(productBody);
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
    }

    @PutMapping("/{id}")
    ResponseEntity<Product> putProduct(@Valid @RequestBody ProductBody productBody,
                                       @AuthenticationPrincipal LocalUser user, @PathVariable int id) {
        if(user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        UserRole userRole = user.getUserRole();
        if(userRole.equals(UserRole.ADMINISTRATOR)) {
            Product response = productService.editProduct(productBody, id);
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
    }

    @DeleteMapping("/{id}")
    ResponseEntity deleteProduct(@AuthenticationPrincipal LocalUser user, @PathVariable int id) {
        if(user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        UserRole userRole = user.getUserRole();
        if(userRole.equals(UserRole.ADMINISTRATOR)) {
            try {
                productService.deleteProduct(id);
                return ResponseEntity.ok().build();
            } catch(Exception ex) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }


    }

}

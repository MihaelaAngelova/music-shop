package com.project.ecommercebackend.api.controller.product;

import com.project.ecommercebackend.model.Product;
import com.project.ecommercebackend.service.ProductService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/product")
public class ProductController {

    private ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
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

}

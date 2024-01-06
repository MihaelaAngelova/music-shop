package com.project.ecommercebackend.api.controller.category;

import com.project.ecommercebackend.model.Product;
import com.project.ecommercebackend.model.ProductType;
import com.project.ecommercebackend.service.ProductService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/category")
public class CategoryController {
    private ProductService productService;

    public CategoryController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping("/{type}")
    public ResponseEntity<List<Product>> getProductsByCategory(@PathVariable int type) {
        try{
            ProductType productType = ProductType.values()[type];
            List<Product> response = productService.getProductsByType(productType);
            return ResponseEntity.ok(response);
        } catch(Exception ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}

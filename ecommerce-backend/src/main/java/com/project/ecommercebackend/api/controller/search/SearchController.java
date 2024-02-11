package com.project.ecommercebackend.api.controller.search;

import com.project.ecommercebackend.model.Product;
import com.project.ecommercebackend.service.ProductService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/search")
@CrossOrigin(origins = "http://localhost:63342", allowCredentials = "true")
public class SearchController {

    private ProductService productService;

    public SearchController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping("/{input}")
    public List<Product> search(@PathVariable String input) {
        return productService.searchProducts(input);
    }
}

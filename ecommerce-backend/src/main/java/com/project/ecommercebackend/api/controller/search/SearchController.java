package com.project.ecommercebackend.api.controller.search;

import com.project.ecommercebackend.model.Product;
import com.project.ecommercebackend.service.interfaces.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/search")
@CrossOrigin(origins = "http://localhost:63342", allowCredentials = "true")
public class SearchController {

    @Autowired
    ProductService productService;

    @GetMapping("/{input}")
    public List<Product> search(@PathVariable String input) {
        return productService.searchProducts(input);
    }
}

package com.project.ecommercebackend.api.controller.home;

import com.project.ecommercebackend.model.Product;
import com.project.ecommercebackend.service.interfaces.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/home")
@CrossOrigin(origins = "*")
public class HomeController {

    @Autowired
    ProductService productService;

    @GetMapping
    public List<Product> homepage() {
        return productService.getProducts();
    }

}

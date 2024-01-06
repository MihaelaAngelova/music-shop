package com.project.ecommercebackend.service;

import com.project.ecommercebackend.model.Product;
import com.project.ecommercebackend.model.ProductType;
import com.project.ecommercebackend.model.dao.ProductDAO;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    private ProductDAO productDAO;

    public ProductService(ProductDAO productDAO) {
        this.productDAO = productDAO;
    }

    public List<Product> getProducts() {
        return productDAO.findAll();
    }

    public List<Product> getProductsByType(ProductType productType) {
        return productDAO
                .findAll()
                .stream()
                .filter(product -> productType == product.getType())
                .toList();
    }

    public List<Product> searchProducts(String input) {
        return productDAO
                .findAll()
                .stream()
                .filter(product ->
                        product.getDescription().toLowerCase().contains(input.toLowerCase())
                                || product.getName().toLowerCase().contains(input.toLowerCase()))
                .toList();
    }
}

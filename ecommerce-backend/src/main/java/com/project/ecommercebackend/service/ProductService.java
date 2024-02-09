package com.project.ecommercebackend.service;

import com.project.ecommercebackend.api.model.ProductBody;
import com.project.ecommercebackend.model.LocalUser;
import com.project.ecommercebackend.model.Product;
import com.project.ecommercebackend.model.ProductType;
import com.project.ecommercebackend.model.dao.ProductDAO;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    @Value("${upload.directory}")
    private String uploadDirectory;

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

    public Optional<Product> getProduct(Long id) {
        return productDAO.findById(id);
    }

    public Product createProduct(ProductBody productBody, MultipartFile image) {
        Product product = new Product();
        copyProductData(productBody, product);

        saveImage(image);

        String imagePath = "images/" + image.getOriginalFilename();
        product.setImagePath(imagePath);
        return productDAO.save(product);
    }

    private void saveImage(MultipartFile image) {
        String imagePath = "/Users/mishi/Desktop/ecommerce/ecommerce-frontend/images/" + image.getOriginalFilename();

        try {
            Files.copy(image.getInputStream(), Paths.get(imagePath), StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException e) {
            throw new RuntimeException("Failed to save image", e);
        }
    }


    private static void copyProductData(ProductBody productBody, Product product) {
        product.setName(productBody.getName());
        product.setDescription(productBody.getDescription());
        product.setPrice(productBody.getPrice());
        product.setType(productBody.getType());
        product.setQuantity(productBody.getQuantity());
    }

    public Optional<Product> editProduct(ProductBody productBody, int productID, MultipartFile image ) {
        return productDAO.findById((long)productID)
                .map(product -> {
                    copyProductData(productBody, product);
                    if(image != null && !image.isEmpty()) {
                        saveImage(image);
                        String imagePath = "images/" + image.getOriginalFilename();
                        product.setImagePath(imagePath);
                    }
                    return productDAO.save(product);
                });
    }

    public void deleteProduct(int productID) {
        productDAO.deleteById((long)productID);
    }

    public boolean decreaseQuantity(Long productId, int quantity) {
        return productDAO.findById((long)productId)
                .map(p -> p.getQuantity() - quantity >= 0)
                .orElse(false);
    }
}

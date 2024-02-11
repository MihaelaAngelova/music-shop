package com.project.ecommercebackend.service.interfaces;

import com.project.ecommercebackend.api.model.ProductBody;
import com.project.ecommercebackend.model.Product;
import com.project.ecommercebackend.model.ProductType;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

public interface ProductService {
    List<Product> getProducts();

    List<Product> getProductsByType(ProductType productType);

    List<Product> searchProducts(String input);

    Optional<Product> getProduct(Long id);

    Product createProduct(ProductBody productBody, MultipartFile image);

    Optional<Product> editProduct(ProductBody productBody, int productID, MultipartFile image);

    void deleteProduct(long productID);

    void deleteImageFromFolder(long productID);

    boolean decreaseQuantity(Long productId, int quantity);
}

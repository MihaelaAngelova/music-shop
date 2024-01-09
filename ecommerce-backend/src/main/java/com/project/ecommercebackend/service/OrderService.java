package com.project.ecommercebackend.service;

import com.project.ecommercebackend.api.model.ProductQuantityPair;
import com.project.ecommercebackend.model.*;
import com.project.ecommercebackend.model.dao.AddressDAO;
import com.project.ecommercebackend.model.dao.OrderElementDAO;
import com.project.ecommercebackend.model.dao.WebOrderDAO;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderService {
    private WebOrderDAO webOrderDAO;
    private AddressDAO addressDAO;
    private ProductService productService;
    private OrderElementDAO orderElementDAO;

    public OrderService(WebOrderDAO webOrderDAO, AddressDAO addressDAO, ProductService productService, OrderElementDAO orderElementDAO) {
        this.webOrderDAO = webOrderDAO;
        this.addressDAO = addressDAO;
        this.productService = productService;
        this.orderElementDAO = orderElementDAO;
    }

    public List<OrderElement> convert(List<ProductQuantityPair> productQuantityPairList) {
        return productQuantityPairList.stream().map(productQuantityPair -> {
            int id = productQuantityPair.getProductId();
            Product product = productService.getProduct(id);
            OrderElement webOrderQuantities = new OrderElement();
            webOrderQuantities.setProduct(product);
            webOrderQuantities.setQuantity(productQuantityPair.getQuantity());
            return webOrderQuantities;
        }).collect(Collectors.toList());
    }

    @Transactional
    public WebOrder saveOrder(String email, Address address, List<ProductQuantityPair> cart) {
        Address savedAddress = addressDAO.save(address);
        WebOrder order = new WebOrder();
        List<OrderElement> orderElements = convert(cart)
                .stream()
                .peek(oe -> oe.setOrder(order))
                .toList();
        order.setAddress(savedAddress);
        order.setEmail(email);
        order.setOrderElements(orderElements);
        return webOrderDAO.save(order);
    }
}

package com.project.ecommercebackend.service;

import com.project.ecommercebackend.api.model.CartItem;
import com.project.ecommercebackend.model.*;
import com.project.ecommercebackend.model.dao.AddressDAO;
import com.project.ecommercebackend.model.dao.ProductDAO;
import com.project.ecommercebackend.model.dao.WebOrderDAO;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class OrderService {
    private WebOrderDAO webOrderDAO;
    private AddressDAO addressDAO;
    private ProductDAO productDAO;

    public OrderService(WebOrderDAO webOrderDAO, AddressDAO addressDAO, ProductDAO productDAO) {
        this.webOrderDAO = webOrderDAO;
        this.addressDAO = addressDAO;
        this.productDAO = productDAO;
    }

    public List<OrderElement> convert(List<CartItem> productQuantityPairList) {
        return productQuantityPairList.stream().map(productQuantityPair -> {
            Long id = productQuantityPair.getProduct().getId();
            Optional<Product> productMaybe = productDAO.findById(id);
            if (productMaybe.isEmpty()) {
                return null;
            }
            Product product = productMaybe.get();
            OrderElement webOrderQuantities = new OrderElement();
            webOrderQuantities.setProduct(product);
            webOrderQuantities.setQuantity(productQuantityPair.getQuantity());
            return webOrderQuantities;
        }).collect(Collectors.toList());
    }

    @Transactional
    public WebOrder saveOrder(String email, String firstName, String lastName, String phoneNumber, Address address, List<CartItem> cart) {
        Address savedAddress = addressDAO.save(address);
        WebOrder order = new WebOrder();

        List<OrderElement> orderElements = convert(cart);
        if (orderElements.stream().anyMatch(oe -> oe == null)) {
            return null;
        }

        orderElements = orderElements
                .stream()
                .peek(oe -> {
                    oe.setOrder(order);
                    Product p = oe.getProduct();
                    p.setQuantity(p.getQuantity() - oe.getQuantity());
                })
                .toList();

        order.setAddress(savedAddress);
        order.setEmail(email);
        order.setOrderElements(orderElements);
        order.setFirstName(firstName);
        order.setLastName(lastName);
        order.setPhoneNumber(phoneNumber);
        return webOrderDAO.save(order);
    }
}

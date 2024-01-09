package com.project.ecommercebackend.service;

import com.project.ecommercebackend.api.model.ProductQuantityPair;
import com.project.ecommercebackend.model.*;
import com.project.ecommercebackend.model.dao.AddressDAO;
import com.project.ecommercebackend.model.dao.OrderElementDAO;
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

    public List<OrderElement> convert(List<ProductQuantityPair> productQuantityPairList) {
        return productQuantityPairList.stream().map(productQuantityPair -> {
            int id = productQuantityPair.getProductId();
            Optional<Product> productMaybe = productDAO.findById(new Long(id));
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
    public WebOrder saveOrder(String email, Address address, List<ProductQuantityPair> cart) {
        Address savedAddress = addressDAO.save(address);
        WebOrder order = new WebOrder();

        List<OrderElement> orderElements = convert(cart);
        // if some element is null, then its product is not found
        // => invalid product list, return null
        if (orderElements.stream().anyMatch(oe -> oe == null)) {
            return null;
        }

        orderElements = orderElements
                .stream()
                .peek(oe -> {
                    oe.setOrder(order); // bind each to its parent WebOrder
                    // and subtract relevant product quantities
                    Product p = oe.getProduct();
                    p.setQuantity(p.getQuantity() - oe.getQuantity());
                })
                .toList();

        order.setAddress(savedAddress);
        order.setEmail(email);
        order.setOrderElements(orderElements);
        return webOrderDAO.save(order);
    }
}

package com.project.ecommercebackend.service.interfaces;

import com.project.ecommercebackend.api.model.CartItem;
import com.project.ecommercebackend.model.Address;
import com.project.ecommercebackend.model.OrderElement;
import com.project.ecommercebackend.model.WebOrder;
import jakarta.transaction.Transactional;

import java.util.List;

public interface OrderService {
    List<OrderElement> convert(List<CartItem> productQuantityPairList);
    @Transactional
    WebOrder saveOrder(String email, String firstName, String lastName, String phoneNumber, Address address, List<CartItem> cart);
}

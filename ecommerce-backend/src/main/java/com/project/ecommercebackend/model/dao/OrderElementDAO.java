package com.project.ecommercebackend.model.dao;

import com.project.ecommercebackend.model.OrderElement;
import org.springframework.data.repository.ListCrudRepository;

public interface OrderElementDAO extends ListCrudRepository<OrderElement, Long> {
}

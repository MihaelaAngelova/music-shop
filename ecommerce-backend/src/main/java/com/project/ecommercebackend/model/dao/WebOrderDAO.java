package com.project.ecommercebackend.model.dao;

import com.project.ecommercebackend.model.LocalUser;
import com.project.ecommercebackend.model.WebOrder;
import org.springframework.data.repository.ListCrudRepository;

import java.util.List;

public interface WebOrderDAO extends ListCrudRepository<WebOrder, Long> {
}

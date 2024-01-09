package com.project.ecommercebackend.model.dao;

import com.project.ecommercebackend.model.Address;
import org.springframework.data.repository.ListCrudRepository;

public interface AddressDAO extends ListCrudRepository<Address, Long> {
}

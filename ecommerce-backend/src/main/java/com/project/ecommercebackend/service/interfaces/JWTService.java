package com.project.ecommercebackend.service.interfaces;

import com.project.ecommercebackend.model.LocalUser;
import jakarta.annotation.PostConstruct;

public interface JWTService {
    @PostConstruct
    void postConstruct();

    String generateJWT(LocalUser user);

    String getEmail(String token);
}

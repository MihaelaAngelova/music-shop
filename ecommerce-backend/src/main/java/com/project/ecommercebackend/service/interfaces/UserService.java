package com.project.ecommercebackend.service.interfaces;

import com.project.ecommercebackend.api.model.LoginBody;
import com.project.ecommercebackend.api.model.RegistrationBody;
import com.project.ecommercebackend.exception.UserAlreadyExistsException;
import com.project.ecommercebackend.model.LocalUser;
import com.project.ecommercebackend.model.UserRole;
import jakarta.transaction.Transactional;

public interface UserService {
    @Transactional
    LocalUser registerUser(RegistrationBody registrationBody) throws UserAlreadyExistsException;

    String loginUser(LoginBody loginBody);

    UserRole getUserRole(String jwt);
}

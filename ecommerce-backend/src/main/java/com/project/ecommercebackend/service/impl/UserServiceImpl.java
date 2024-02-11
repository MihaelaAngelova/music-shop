package com.project.ecommercebackend.service.impl;
import com.project.ecommercebackend.api.model.LoginBody;
import com.project.ecommercebackend.api.model.RegistrationBody;
import com.project.ecommercebackend.exception.UserAlreadyExistsException;
import com.project.ecommercebackend.model.Address;
import com.project.ecommercebackend.model.LocalUser;
import com.project.ecommercebackend.model.UserRole;
import com.project.ecommercebackend.model.dao.AddressDAO;
import com.project.ecommercebackend.model.dao.LocalUserDAO;
import com.project.ecommercebackend.service.interfaces.UserService;
import com.project.ecommercebackend.service.interfaces.EncryptionService;
import com.project.ecommercebackend.service.interfaces.JWTService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    // service interfaces
    @Autowired
    EncryptionService encryptionService;
    @Autowired
    JWTService jwtService;

    // DAO interfaces
    @Autowired
    AddressDAO addressDAO;
    @Autowired
    LocalUserDAO localUserDAO;

    @Override@Transactional
    public LocalUser registerUser(RegistrationBody registrationBody) throws UserAlreadyExistsException {
        if (localUserDAO.findByEmailIgnoreCase(registrationBody.getEmail()).isPresent()) {
            throw new UserAlreadyExistsException();
        }
        LocalUser user = new LocalUser();
        Address address = new Address();
        user.setEmail(registrationBody.getEmail());
        user.setFirstName(registrationBody.getFirstName());
        user.setLastName(registrationBody.getLastName());
        user.setUserRole(UserRole.USER);
        user.setPhoneNumber(registrationBody.getPhoneNumber());
        user.setPassword(encryptionService.encryptPassword(registrationBody.getPassword()));
        address.setAddress(registrationBody.getAddress());
        address.setCity(registrationBody.getCity());
        address.setCountry(registrationBody.getCountry());
        address.setUser(user);
        address = addressDAO.save(address);
        user.setAddress(address);
        return localUserDAO.save(user);
    }

    @Override public String loginUser(LoginBody loginBody) {
        Optional<LocalUser> opUser = localUserDAO.findByEmailIgnoreCase(loginBody.getEmail());
        if(opUser.isPresent()) {
            LocalUser user = opUser.get();
            if(encryptionService.verifyPassword(loginBody.getPassword(), user.getPassword())) {
                return jwtService.generateJWT(user);
            }
        }
        return null;
    }

    @Override public UserRole getUserRole(String jwt) {
        String email = jwtService.getEmail(jwt);
        Optional<LocalUser> opUser = localUserDAO.findByEmailIgnoreCase(email);
        return opUser.map(LocalUser::getUserRole).orElse(null);
    }
}

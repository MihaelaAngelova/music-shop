package com.project.ecommercebackend.service;

import com.project.ecommercebackend.api.model.LoginBody;
import com.project.ecommercebackend.api.model.RegistrationBody;
import com.project.ecommercebackend.exception.UserAlreadyExistsException;
import com.project.ecommercebackend.model.Address;
import com.project.ecommercebackend.model.LocalUser;
import com.project.ecommercebackend.model.UserRole;
import com.project.ecommercebackend.model.dao.AddressDAO;
import com.project.ecommercebackend.model.dao.LocalUserDAO;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    private LocalUserDAO localUserDAO;
    private EncryptionService encryptionService;
    private JWTService jwtService;

    private AddressDAO addressDAO;

    public UserService(LocalUserDAO localUserDAO, EncryptionService encryptionService, JWTService jwtService, AddressDAO addressDAO) {
        this.localUserDAO = localUserDAO;
        this.encryptionService = encryptionService;
        this.jwtService = jwtService;
        this.addressDAO = addressDAO;
    }

    @Transactional
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

    public String loginUser(LoginBody loginBody) {
        Optional<LocalUser> opUser = localUserDAO.findByEmailIgnoreCase(loginBody.getEmail());
        if(opUser.isPresent()) {
            LocalUser user = opUser.get();
            if(encryptionService.verifyPassword(loginBody.getPassword(), user.getPassword())) {
                return jwtService.generateJWT(user);
            }
        }
        return null;
    }

    public UserRole getUserRole(String jwt) {
        String email = jwtService.getEmail(jwt);
        Optional<LocalUser> opUser = localUserDAO.findByEmailIgnoreCase(email);
        if(opUser.isPresent()) {
            return opUser.get().getUserRole();
        }
        return null;
    }
}

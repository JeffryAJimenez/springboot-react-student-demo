package com.example.demo.auth0user;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Service
public class Auth0Service {

    private final Auth0Repository auth0Repository;

    public boolean userExistsByAuth0Id(String id){

        //return true;
        return auth0Repository.userExistsBySubId(id);
    }

    public void addAuth0User(Auth0User user){

        auth0Repository.save(user);
    }

    public List<Auth0User> getAllUsers() {

        return auth0Repository.findAll();

    }
}

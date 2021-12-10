package com.example.demo.auth0user;


import com.example.demo.student.Student;
import com.example.demo.student.StudentService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;
import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping(path = "api/v1/users")
@AllArgsConstructor
public class Auth0UserController  {

    private final Auth0Service auth0Service;

    @GetMapping
    public List<Auth0User> getsUsers(){

        return auth0Service.getAllUsers();
    }

    @PostMapping
    public void updateAuth0User() {
        System.out.println("user updated");

    }

}


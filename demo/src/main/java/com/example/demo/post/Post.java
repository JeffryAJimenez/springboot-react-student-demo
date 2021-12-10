package com.example.demo.post;

import com.example.demo.auth0user.Auth0User;
import com.fasterxml.jackson.annotation.JsonFormat;

import java.util.Date;

public class Post {

    private Long id;
    private Auth0User user_id;
    private String body;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date datetime;
}

package com.example.demo.auth0user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface Auth0Repository extends JpaRepository<Auth0User, Long> {

    //JPQL
    @Query("" +
            "SELECT CASE WHEN COUNT(user) > 0 THEN " +
            "TRUE ELSE FALSE END " +
            "FROM Auth0User user " +
            "WHERE user.subId = ?1"
    )
    boolean userExistsBySubId(String id);
}

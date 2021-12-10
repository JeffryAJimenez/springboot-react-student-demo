package com.example.demo.auth0user;


import lombok.*;

import javax.persistence.*;

@ToString
@Getter
@Setter
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table
public class Auth0User {

    @Id
    @SequenceGenerator(
            name = "auth0_sequence",
            sequenceName = "auth0_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            generator = "auth0_sequence",
            strategy = GenerationType.SEQUENCE)
    private Long id;
    @Column(nullable = false, unique = true)
    private String subId;
    private String username;
    private String email;

    public Auth0User(String subId, String email, String username) {
        this.subId = subId;
        this.email = email;
        this.username = username;
    }

    public Auth0User(String subId) {
        this.subId = subId;
    }
}

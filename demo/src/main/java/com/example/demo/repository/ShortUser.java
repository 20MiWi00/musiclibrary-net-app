package com.example.demo.repository;

import lombok.Getter;
import lombok.Setter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.io.Serializable;

@Getter
@Setter
public class ShortUser implements Serializable {
    private String login;
    private String password;

    public ShortUser(){}

    public ShortUser(String login,String password, String name,String surname,String mail){
        this.login = login;
        this.password = password;
    }

    public void hashPassword() {
        BCryptPasswordEncoder b = new BCryptPasswordEncoder();
        setPassword(b.encode(password));
    }
}


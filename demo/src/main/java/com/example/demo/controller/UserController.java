package com.example.demo.controller;

import com.example.demo.repository.ShortUser;
import com.example.demo.repository.User;
import com.example.demo.repository.UserRepository;
import net.minidev.json.JSONObject;
import org.hibernate.exception.ConstraintViolationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Iterator;


@RestController
@CrossOrigin(origins = "*")
public class UserController{

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody User user){
        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.setContentType(MediaType.TEXT_PLAIN);
        user.hashPassword();
        userRepository.save(user);
        return new ResponseEntity<>("OK",responseHeaders, HttpStatus.valueOf(200));
    }

    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestBody ShortUser user){
        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.setContentType(MediaType.TEXT_PLAIN);
        BCryptPasswordEncoder b = new BCryptPasswordEncoder();
        User existingUser = userRepository.findByLogin(user.getLogin());
        if(existingUser == null){
            return new ResponseEntity<>("Err",responseHeaders, HttpStatus.valueOf(500));
        }
        if(!b.matches(user.getPassword(),existingUser.getPassword())) {
            return new ResponseEntity<>("Err", responseHeaders, HttpStatus.valueOf(500));
        }
        return new ResponseEntity<>(existingUser.getLogin(),responseHeaders, HttpStatus.valueOf(200));
    }
}
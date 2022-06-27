package com.example.demo.service;
import com.example.demo.repository.User;
import java.util.List;

public interface IUserService {
    List<User> findAll();

}

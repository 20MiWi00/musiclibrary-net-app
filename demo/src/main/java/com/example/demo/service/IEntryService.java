package com.example.demo.service;

import com.example.demo.repository.Entry;

import java.util.List;

public interface IEntryService {
    List<Entry> findAll();
}

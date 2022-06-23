package com.example.demo.service;

import com.example.demo.repository.Entry;
import com.example.demo.repository.EntryRepository;
import com.example.demo.repository.User;
import lombok.var;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EntryService implements IEntryService{

    @Autowired
    private EntryRepository repository;


    @Override
    public List<Entry> findAll() {
        var entries = (List<Entry>) repository.findAll();
        return entries;
    }
}

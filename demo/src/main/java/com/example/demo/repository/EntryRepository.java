package com.example.demo.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EntryRepository extends CrudRepository<Entry,String> {
    Entry findByTitle(String title);
    Entry findById(Integer id);
}

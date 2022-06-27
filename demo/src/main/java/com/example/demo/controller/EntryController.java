package com.example.demo.controller;
import com.example.demo.repository.Entry;
import com.example.demo.repository.EntryRepository;
import com.example.demo.templates.ResponseHandler;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
public class EntryController {

    @Autowired
    private EntryRepository entryRepository;

    @PostMapping(value = "/getEntry")
    public ResponseEntity<Object> getEntry(@RequestBody String id){
        Entry entry = entryRepository.findById(Integer.parseInt(id));
        return ResponseHandler.generateResponse("Success",HttpStatus.OK,entry);
    }

    @PostMapping(value = "/deleteEntry")
    public ResponseEntity<Object> deleteEntry(@RequestBody String id){
        entryRepository.delete(entryRepository.findById(Integer.parseInt(id)));
        return ResponseHandler.generateResponse("Usunięto wpis",HttpStatus.OK,null);
    }

    @GetMapping(value = "/getEntries")
    public ResponseEntity<Object> returnEntries(){
        return ResponseHandler.generateResponse("Success",HttpStatus.OK,entryRepository.findAll());
    }
}

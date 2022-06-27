package com.example.demo.controller;
import com.example.demo.repository.Entry;
import com.example.demo.repository.EntryRepository;
import com.example.demo.repository.User;
import com.example.demo.templates.ResponseHandler;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class EntryController {

    @Autowired
    private EntryRepository entryRepository;

    @PostMapping(value = "/getEntry")
    public ResponseEntity<Object> getEntry(@RequestBody String id){
        if(id == null){
            return ResponseHandler.generateResponse("Error",HttpStatus.valueOf(500),null);
        }
        Entry entry = entryRepository.findById(Integer.parseInt(id));
        if(entry == null){
            return ResponseHandler.generateResponse("Error",HttpStatus.valueOf(500),null);
        }
        return ResponseHandler.generateResponse("Success",HttpStatus.OK,entry);
    }

    @PostMapping(value = "/deleteEntry")
    public ResponseEntity<Object> deleteEntry(@RequestBody String id){
        if(id == null){
            return ResponseHandler.generateResponse("Error",HttpStatus.valueOf(500),null);
        }
        entryRepository.delete(entryRepository.findById(Integer.parseInt(id)));
        return ResponseHandler.generateResponse("Usunięto wpis",HttpStatus.OK,null);
    }

    @GetMapping(value = "/getEntries")
    public ResponseEntity<Object> returnEntries(){
        return ResponseHandler.generateResponse("Success",HttpStatus.OK,entryRepository.findAll());
    }

    @PostMapping(value = "/editEntry", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<Object> addEntry(@RequestParam MultiValueMap<String,String> paramMap){
        String id = String.valueOf(paramMap.getFirst("entryID"));
        if(id == null){
            return ResponseHandler.generateResponse("Error",HttpStatus.valueOf(500),null);
        }
        Entry entry = entryRepository.findById(Integer.parseInt(id));
        if(entry == null){
            return ResponseHandler.generateResponse("Error",HttpStatus.valueOf(500),null);
        }
        entry.setTitle(String.valueOf(paramMap.getFirst("title")));
        entry.setSinger(String.valueOf(paramMap.getFirst("singer")));
        entry.setCategory(String.valueOf(paramMap.getFirst("category")));
        entry.setYearofproduction(String.valueOf(paramMap.getFirst("yearOfProduction")));
        entry.setDescription(String.valueOf(paramMap.getFirst("description")));
        entry.setSongtrack(String.valueOf(paramMap.getFirst("songTrack")));
        entry.setVinylversions(String.valueOf(paramMap.getFirst("vinylVersions")));
        entryRepository.save(entry);
        return ResponseHandler.generateResponse("Success", HttpStatus.OK,null);
    }

}

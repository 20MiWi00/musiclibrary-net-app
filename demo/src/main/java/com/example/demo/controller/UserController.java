package com.example.demo.controller;

import com.example.demo.repository.*;
import com.example.demo.storage.StorageService;
import com.example.demo.templates.ResponseHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.util.*;


@RestController
@CrossOrigin(origins = "*")
public class UserController{

    private StorageService storageService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    public UserController(StorageService storageService) {
        this.storageService = storageService;
    }

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody User user){
        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.setContentType(MediaType.TEXT_PLAIN);
        user.hashPassword();
        userRepository.save(user);
        return new ResponseEntity<>("OK",responseHeaders, HttpStatus.valueOf(200));
    }

    @PostMapping(value = "/login")
    public ResponseEntity<Object> loginUser(@RequestBody ShortUser user){
        BCryptPasswordEncoder b = new BCryptPasswordEncoder();
        User existingUser = userRepository.findByLogin(user.getLogin());
        if(existingUser == null){
            return ResponseHandler.generateResponse("Error",HttpStatus.valueOf(500),null);
        }
        if(!b.matches(user.getPassword(),existingUser.getPassword())) {
            return ResponseHandler.generateResponse("Error",HttpStatus.valueOf(500),null);
        }
        return ResponseHandler.generateResponse("Success",HttpStatus.OK,existingUser.getLogin());
    }

    @PostMapping(value = "/changePass")
    public ResponseEntity<Object> changePassword(@RequestBody ShortUser user){
        User existingUser = userRepository.findByLogin(user.getLogin());
        user.hashPassword();
        existingUser.setPassword(user.getPassword());
        userRepository.save(existingUser);
        return ResponseHandler.generateResponse("Success",HttpStatus.OK,null);
    }

    @PostMapping(value = "/addEntry", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<Object> addEntry(@RequestParam MultiValueMap<String,String> paramMap, @RequestParam(value = "file", required = false)MultipartFile file){
        User user = userRepository.findByLogin(String.valueOf(paramMap.getFirst("login")));
        Entry newEntry = new Entry(
                user,String.valueOf(paramMap.getFirst("title")),
                String.valueOf(paramMap.getFirst("singer")),String.valueOf(paramMap.getFirst("category")),
                String.valueOf(paramMap.getFirst("yearOfProduction")),String.valueOf(paramMap.getFirst("description")),
                String.valueOf(paramMap.getFirst("songTrack")), String.valueOf(paramMap.getFirst("vinylVersions")), file.getOriginalFilename());
        List<Entry> existingEntries = user.getEntries();
        existingEntries.add(newEntry);
        user.setEntries(existingEntries);
        userRepository.save(user);
        try{
            storageService.store(file);
        }catch(Exception e){
            System.out.println("File already exisis");
        }
        return ResponseHandler.generateResponse("Success", HttpStatus.OK,null);
    }

    @PostMapping(value = "/getUserEntries")
    public ResponseEntity<Object> sendUserEntries(@RequestBody String login){
        User user = userRepository.findByLogin(login);
        return ResponseHandler.generateResponse("Success",HttpStatus.OK,user.getEntries());
    }

    @GetMapping("/files/{filename:.+}")
    @ResponseBody
    public ResponseEntity<Resource> serveFile(@PathVariable String filename) {
        Resource file = null;
        try{
            file = storageService.loadAsResource(filename);
            return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION,
                    "attachment; filename=\"" + file.getFilename() + "\"").body(file);
        }catch(Exception e){
            System.out.println("Waiting...");
        }
        return ResponseEntity.ok().header("File Error").body(null);
    }
}
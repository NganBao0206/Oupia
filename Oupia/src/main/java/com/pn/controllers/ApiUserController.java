package com.pn.controllers;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.pn.components.JwtService;
import com.pn.pojo.Motel;
import com.pn.pojo.Post;
import com.pn.pojo.PostRentDetail;
import com.pn.pojo.User;
import com.pn.service.MotelService;
import com.pn.service.MultipleService;
import com.pn.service.PostService;
import com.pn.service.UserService;
import java.util.List;
import java.util.Map;
import java.security.Principal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
/**
 *
 * @author yuu
 */
@RestController
@RequestMapping(value = "/api", produces = MediaType.APPLICATION_JSON_VALUE)
public class ApiUserController {

    @Autowired
    private UserService userService;
        
    @Autowired
    private MotelService motelService;
    
    @Autowired
    private PostService postService;
    
    @Autowired
    private MultipleService multipleService;
    
    @Autowired
    private JwtService jwtService;

    @PostMapping("/login/")
    @CrossOrigin
    public ResponseEntity<String> login(@RequestBody User user) {
        if (this.userService.authUser(user.getUsername(), user.getPassword()) == true) {
            String token = this.jwtService.generateTokenLogin(user.getUsername());

            return new ResponseEntity<>(token, HttpStatus.OK);
        }

        return new ResponseEntity<>("error", HttpStatus.BAD_REQUEST);
    }

    @PatchMapping("/users/bin/{username}/")
    @CrossOrigin
    public ResponseEntity<Void> restoreUser(@PathVariable("username") String username) {
        boolean restored = userService.restoreUser(username);

        if (restored) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/users/{username}/")
    @CrossOrigin
    public ResponseEntity<Void> deleteUser(@PathVariable("username") String username) {
        boolean deleted = userService.deleteUser(username);

        if (deleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping(path = "/users/{username}/", produces = MediaType.APPLICATION_JSON_VALUE)
    @CrossOrigin
    public ResponseEntity<User> getUser(@PathVariable("username") String username) {
        User u = this.userService.getUserByUsername(username);
        if (u != null && u.getIsDeleted() == false) {
            return new ResponseEntity<>(u, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/users/bin/{username}/")
    @CrossOrigin
    public ResponseEntity<Void> destroyUser(@PathVariable("username") String username) {
        boolean destroyed = userService.destroyUser(username);

        if (destroyed) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/users/authenticated-user/")
    @CrossOrigin
    public ResponseEntity<User> getAuthenticatedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication != null && !(authentication instanceof AnonymousAuthenticationToken) && authentication.isAuthenticated()) {
            String currentPrincipalName = authentication.getName();
            User u = userService.getUserByUsername(currentPrincipalName);
            try {
                ResponseEntity<User> result = new ResponseEntity<>(u, HttpStatus.OK);
                return result;

            } catch (Exception e) {
                e.printStackTrace();
            }
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    @GetMapping(path = "/current-user/", produces = MediaType.APPLICATION_JSON_VALUE)
    @CrossOrigin
    public ResponseEntity<User> details(Principal user) {
        User u = this.userService.getUserByUsername(user.getName());
        return new ResponseEntity<>(u, HttpStatus.OK);
    }

    @PostMapping(value = "/register-landlord/", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @CrossOrigin
    public ResponseEntity<?> register(
            @RequestParam Map<String, String> info,
            @RequestPart("avatar") MultipartFile avatarFile,
            @RequestPart(name = "files", required = false) MultipartFile[] files) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        User userObj = mapper.readValue(info.get("user"), User.class);
        Motel motelObj = mapper.readValue(info.get("motel"), Motel.class);
        Post postObj = mapper.readValue(info.get("post"), Post.class);
        PostRentDetail postRentDetailObj = mapper.readValue(info.get("postRentDetail"), PostRentDetail.class);
        
        motelObj.setUserId(userObj);
        postRentDetailObj.setMotelId(motelObj);
        postRentDetailObj.setPostId(postObj);
        postRentDetailObj.setImgImport(files);
        postObj.setPostRentDetail(postRentDetailObj);
        postObj.setUserId(userObj);
        
        userObj.setFile(avatarFile);
        
        userObj = userService.prepareUser(userObj);
        motelObj = motelService.prepareMotel(motelObj);
        postObj = postService.preparePost(postObj);
        multipleService.addUserWithMotelPost(userObj, motelObj, postObj);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

}

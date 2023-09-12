package com.pn.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.firebase.auth.FirebaseAuthException;
import com.pn.components.FirebaseService;
import com.pn.components.JwtService;
import com.pn.components.MailService;
import com.pn.pojo.Motel;
import com.pn.pojo.Post;
import com.pn.pojo.PostRentDetail;
import com.pn.pojo.User;
import com.pn.service.MotelService;
import com.pn.service.MultipleService;
import com.pn.service.PostService;
import com.pn.service.UserService;
import com.pn.validator.WebAppValidator;
import java.io.IOException;
import java.util.Map;
import java.security.Principal;
import java.util.HashMap;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BeanPropertyBindingResult;
import org.springframework.validation.BindingResult;
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
    private MailService mailService;

    @Autowired
    private MultipleService multipleService;

    @Autowired
    private JwtService jwtService;
    @Autowired
    private FirebaseService firebaseService;
    @Autowired
    private WebAppValidator postValidator;
    @Autowired
    private WebAppValidator postRentValidator;
    @Autowired
    private WebAppValidator motelValidator;
    @Autowired
    private WebAppValidator userValidator;

    @PostMapping("/login/")
    @CrossOrigin
    public ResponseEntity<String> login(@RequestBody User user) {
        if (this.userService.authUser(user.getUsername(), user.getPassword()) == true) {
            String token = this.jwtService.generateTokenLogin(user.getUsername());
            return new ResponseEntity<>(token, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @GetMapping(path = "/auth-token/", produces = MediaType.APPLICATION_JSON_VALUE)
    @CrossOrigin
    public ResponseEntity<String> getTokenFirebase(Principal user) {
        String fbToken;
        try {
            fbToken = this.firebaseService.createCustomToken(user.getName());
            return new ResponseEntity<>(fbToken, HttpStatus.OK);

        } catch (FirebaseAuthException ex) {
            Logger.getLogger(ApiUserController.class.getName()).log(Level.SEVERE, null, ex);
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

    }

    

    @GetMapping(path = "/users/{username}/", produces = MediaType.APPLICATION_JSON_VALUE)
    @CrossOrigin
    public ResponseEntity<User> getUser(@PathVariable("username") String username) {
        User u = this.userService.getUserByUsername(username);
        if (u != null && u.getIsDeleted() == false) {
            return new ResponseEntity<>(u, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

  

    @GetMapping(path = "/current-user/", produces = MediaType.APPLICATION_JSON_VALUE)
    @CrossOrigin
    public ResponseEntity<User> details(Principal user) {
        User u = this.userService.getUserByUsername(user.getName());
        return new ResponseEntity<>(u, HttpStatus.OK);
    }

    @PostMapping(value = "/register-landlord/", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @CrossOrigin
    public ResponseEntity<User> register(
            @RequestParam Map<String, String> info,
            @RequestPart("avatar") MultipartFile avatarFile,
            @RequestPart(name = "files", required = false) MultipartFile[] files) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        User userObj = mapper.readValue(info.get("user"), User.class
        );
        Motel motelObj = mapper.readValue(info.get("motel"), Motel.class
        );
        Post postObj = mapper.readValue(info.get("post"), Post.class
        );
        PostRentDetail postRentDetailObj = mapper.readValue(info.get("postRentDetail"), PostRentDetail.class
        );

        motelObj.setUserId(userObj);
        postRentDetailObj.setMotelId(motelObj);
        postRentDetailObj.setPostId(postObj);
        postRentDetailObj.setImgImport(files);
        postObj.setPostRentDetail(postRentDetailObj);
        postObj.setUserId(userObj);

        userObj.setFile(avatarFile);

        BindingResult resultUser = new BeanPropertyBindingResult(userObj, "user");
        BindingResult resultMotel = new BeanPropertyBindingResult(motelObj, "motel");
        BindingResult resultPost = new BeanPropertyBindingResult(postObj, "post");
        BindingResult resultDetail = new BeanPropertyBindingResult(postRentDetailObj, "postRentDetail");

        resultUser = (BindingResult) userValidator.getValidateErrors(userObj, resultUser);
        resultMotel = (BindingResult) motelValidator.getValidateErrors(motelObj, resultMotel);
        resultPost = (BindingResult) postValidator.getValidateErrors(postObj, resultPost);
        resultDetail = (BindingResult) postRentValidator.getValidateErrors(postRentDetailObj, resultDetail);

        if (resultUser.hasErrors() || resultPost.hasErrors() || resultDetail.hasErrors() || resultMotel.hasErrors()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        userObj = userService.prepareUser(userObj);
        motelObj = motelService.prepareMotel(motelObj);
        postObj = postService.preparePost(postObj);
        multipleService.addUserWithMotelPost(userObj, motelObj, postObj);
        User finalUser = userService.getUserByUsername(userObj.getUsername());
        if (finalUser != null) {
            mailService.sendEmail(finalUser);
        }
        return new ResponseEntity<>(finalUser, HttpStatus.CREATED);
    }

    @PostMapping(path = "/users/", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE}, produces = {MediaType.APPLICATION_JSON_VALUE})
    @CrossOrigin
    public ResponseEntity<User> addUser(@RequestParam Map<String, String> params, @RequestPart MultipartFile avatar) {
        User user = this.userService.addUser(params, avatar);
        if (user != null) {

            mailService.sendEmail(user);
            return new ResponseEntity<>(user, HttpStatus.CREATED);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @GetMapping(path = "/resend-confirm-email/")
    @CrossOrigin
    public ResponseEntity<?> resend(Principal u) {
        User user = userService.getUserByUsername(u.getName());
        if (user != null && user.getIsConfirm() == false) {
            mailService.sendEmail(user);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @GetMapping(path = "/confirm-email/{username}/{token}/")
    @CrossOrigin
    public ResponseEntity<?> confirmUser(@PathVariable("token") String token, @PathVariable("username") String username, HttpServletResponse response) {
        User user = userService.getUserByUsername(username);
        String email = mailService.getEmailFromToken(token);
        if (user.getEmail().equals(email)) {
            try {
                user.setIsConfirm(true);
                userService.addOrUpdateUser(user);
                response.sendRedirect("http://localhost:3000/login");
            } catch (IOException ex) {
                Logger.getLogger(ApiUserController.class.getName()).log(Level.SEVERE, null, ex);
            }
        }

        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

}

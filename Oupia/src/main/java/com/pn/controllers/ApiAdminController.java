package com.pn.controllers;

import com.pn.pojo.Comment;
import com.pn.pojo.User;
import com.pn.service.CommentService;
import com.pn.service.MotelService;
import com.pn.service.UserService;
import java.security.Principal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
/**
 *
 * @author yuu
 */
@RestController
@RequestMapping(value = "/admin", produces = MediaType.APPLICATION_JSON_VALUE)
public class ApiAdminController {
    @Autowired
    private UserService userService;
    
    @Autowired
    private MotelService motelService;

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
    
    @PatchMapping("/users-approval/{userId}/")
    public ResponseEntity<Void> approvalUser(@PathVariable("userId") int userId, @RequestParam("status") String status) {
        boolean rs = userService.updateStatus(userId, status);
       
        if (rs) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    
    @PatchMapping("/motels-approval/{motelId}/")
    public ResponseEntity<Void> approvalMotel(@PathVariable("motelId") int motelId, @RequestParam("status") String status) {
        boolean rs = motelService.updateStatus(motelId, status);
       
        if (rs) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}

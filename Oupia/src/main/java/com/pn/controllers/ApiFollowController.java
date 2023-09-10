package com.pn.controllers;

import com.pn.pojo.Follow;
import com.pn.pojo.User;
import com.pn.service.FollowService;
import com.pn.service.UserService;
import java.security.Principal;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
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
@RequestMapping(value = "/api/follows", produces = MediaType.APPLICATION_JSON_VALUE)
public class ApiFollowController {

    @Autowired
    private Environment env;
    @Autowired
    private FollowService followService;
    @Autowired
    private UserService userService;

    @PostMapping(path = "/")
    @CrossOrigin
    public ResponseEntity<Follow> addFollow(@RequestBody Follow follow, Principal user) {
        User u = userService.getUserByUsername(user.getName());
        Follow fol = followService.getFollowing(user.getName(), follow.getBeFollowedUserId().getUsername());
        if (fol != null) {
            return new ResponseEntity<>(fol, HttpStatus.FOUND);
        }
        follow.setFollowUserId(u);
        Follow createdFollow = followService.addFollow(follow);
        return new ResponseEntity<>(createdFollow, HttpStatus.CREATED);
    }

    @DeleteMapping(path = "/")
    @CrossOrigin
    public ResponseEntity<?> remove(@RequestParam("id") int id, Principal user) {
        try {
            Follow follow = followService.getFollowById(id);
            if (!follow.getFollowUserId().getUsername().equals(user.getName())) {
                return new ResponseEntity<>(HttpStatus.FORBIDDEN);
            } else {
                Boolean rs = followService.removeFollow(id);
                if (rs) {
                    return new ResponseEntity<>(HttpStatus.NO_CONTENT);
                } else {
                    return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
                }
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping(path = "/followers/{username}/")
    @CrossOrigin
    public ResponseEntity<List<Follow>> getFollowers(@PathVariable("username") String username) {
        int pageSize = Integer.parseInt(env.getProperty("PAGE_SIZE"));
        List<Follow> followers = followService.getFollowers(username, pageSize);
        return new ResponseEntity<>(followers, HttpStatus.OK);
    }

    @GetMapping(path = "/followings/{username}/")
    @CrossOrigin
    public ResponseEntity<List<Follow>> getFollowings(@PathVariable("username") String username) {
        int pageSize = Integer.parseInt(env.getProperty("PAGE_SIZE"));
        List<Follow> followings = followService.getFollowings(username, pageSize);
        return new ResponseEntity<>(followings, HttpStatus.OK);
    }

    @GetMapping(path = "/followers-count/{username}/")
    @CrossOrigin
    public ResponseEntity<Integer> getCountFollowers(@PathVariable("username") String username) {
        int count = followService.getCountFollowers(username);
        return new ResponseEntity<>(count, HttpStatus.OK);
    }

    @GetMapping(path = "/followings-count/{username}/")
    @CrossOrigin
    public ResponseEntity<Integer> getCountFollowings(@PathVariable("username") String username) {
        int count = followService.getCountFollowings(username);
        return new ResponseEntity<>(count, HttpStatus.OK);
    }

    @GetMapping(path = "/")
    @CrossOrigin
    public ResponseEntity<Follow> getFollow(@RequestParam("follower") String followerUsername, @RequestParam("following") String followingUsername) {
        Follow follow = followService.getFollowing(followerUsername, followingUsername);
        if (follow != null) {
            return new ResponseEntity<>(follow, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}

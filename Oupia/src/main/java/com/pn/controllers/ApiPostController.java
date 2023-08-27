package com.pn.controllers;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.pn.pojo.Image;
import com.pn.pojo.Motel;
import com.pn.pojo.Post;
import com.pn.pojo.User;
import com.pn.service.ImageService;
import com.pn.service.MotelService;
import com.pn.service.PostService;
import java.util.List;
import java.util.Map;
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
@RequestMapping(value = "/api/posts", produces = MediaType.APPLICATION_JSON_VALUE)
public class ApiPostController {

    @Autowired
    private PostService postService;
    @Autowired
    private ImageService imageService;

    @PatchMapping("/bin/{slug}/")
    @CrossOrigin
    public ResponseEntity<Void> restorePost(@PathVariable("slug") String slug) {
        boolean restored = postService.restorePost(slug);

        if (restored) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{slug}/")
    @CrossOrigin
    public ResponseEntity<Void> deletePost(@PathVariable("slug") String slug) {
        boolean deleted = postService.deletePost(slug);

        if (deleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/bin/{slug}/")
    @CrossOrigin
    public ResponseEntity<Void> destroyPost(@PathVariable("slug") String slug) {
        boolean destroyed = postService.destroyPost(slug);

        if (destroyed) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/")
    @CrossOrigin
    public ResponseEntity<List<Post>> getPosts(@RequestParam Map<String, String> params) {
        List<Post> posts = postService.getPosts(params);
        posts.forEach(p -> {
            Image img = imageService.getImageByPost(p.getId());
            p.setImage(img.getImage());
        });
        try {
            ResponseEntity<List<Post>> result = new ResponseEntity<>(posts, HttpStatus.OK);
            return result;

        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}

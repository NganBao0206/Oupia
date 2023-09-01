package com.pn.controllers;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.pn.pojo.Comment;
import com.pn.pojo.Image;
import com.pn.pojo.Motel;
import com.pn.pojo.Post;
import com.pn.pojo.User;
import com.pn.service.CommentService;
import com.pn.service.ImageService;
import com.pn.service.MotelService;
import com.pn.service.PostService;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
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
    private Environment env;
    @Autowired
    private PostService postService;
    @Autowired
    private ImageService imageService;
    @Autowired
    private CommentService commentService;

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

    @GetMapping(path = "/{slug}/", produces = MediaType.APPLICATION_JSON_VALUE)
    @CrossOrigin
    public ResponseEntity<Post> getPostDetail(@PathVariable("slug") String slug) {
        Post post = postService.getPostBySlug(slug);

        if (post != null && post.getIsDeleted() == false) {
            return new ResponseEntity<>(post, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
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
    public ResponseEntity<String> getPosts(@RequestParam Map<String, String> params) {
        params.put("isDeleted", "0");
        params.put("isAccepted", "accepted");
        List<Post> posts = postService.getPosts(params);
        int pageSize = Integer.parseInt(env.getProperty("PAGE_SIZE"));
        int count = postService.countPosts(params);
        int pages = (int) Math.ceil(count * 1.0 / pageSize);
        try {

            Map<String, Object> response = new HashMap<>();
            response.put("pages", pages);
            response.put("posts", posts);
            response.put("total", count);
            ObjectMapper mapper = new ObjectMapper();
            String json = mapper.writeValueAsString(response);
            ResponseEntity<String> result = new ResponseEntity<>(json, HttpStatus.OK);
            return result;

        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/{slug}/images/")
    @CrossOrigin
    public ResponseEntity<String> getImages(@PathVariable("slug") String slug) {
        List<String> images = imageService.getImagesBySlugPost(slug);
        try {
            ObjectMapper mapper = new ObjectMapper();
            String json = mapper.writeValueAsString(images);
            ResponseEntity<String> result = new ResponseEntity<>(json, HttpStatus.OK);
            return result;

        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/{slug}/comments/")
    @CrossOrigin
    public ResponseEntity<String> getComments(@PathVariable("slug") String slug) {
        List<Comment> comments = commentService.getComments(slug);
        try {
            ObjectMapper mapper = new ObjectMapper();
            String json = mapper.writeValueAsString(comments);
            ResponseEntity<String> result = new ResponseEntity<>(json, HttpStatus.OK);
            return result;

        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}

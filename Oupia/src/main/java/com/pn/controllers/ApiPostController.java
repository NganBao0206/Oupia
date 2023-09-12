package com.pn.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.pn.components.MailService;
import com.pn.pojo.Comment;
import com.pn.pojo.Follow;
import com.pn.pojo.Post;
import com.pn.pojo.PostFindDetail;
import com.pn.pojo.PostRentDetail;
import com.pn.service.CommentService;
import com.pn.service.FollowService;
import com.pn.service.ImageService;
import com.pn.service.PostService;
import com.pn.validator.WebAppValidator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import javax.validation.ConstraintViolation;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
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
@RequestMapping(value = "/api/posts", produces = MediaType.APPLICATION_JSON_VALUE)
public class ApiPostController {

    @Autowired
    private Environment env;
    @Autowired
    private PostService postService;
    @Autowired
    private ImageService imageService;
    @Autowired
    private FollowService followService;
    @Autowired
    private CommentService commentService;
    @Autowired
    private WebAppValidator postValidator;
    @Autowired
    private WebAppValidator postRentValidator;
    @Autowired
    private WebAppValidator postFindValidator;

    @Autowired
    private MailService mailService;

    @GetMapping(path = "/{slug}/", produces = MediaType.APPLICATION_JSON_VALUE)
    @CrossOrigin
    public ResponseEntity<Post> getPostDetail(@PathVariable("slug") String slug) {
        Post post = postService.getPostBySlug(slug);

        if (post != null && post.getIsDeleted() == false) {
            return new ResponseEntity<>(post, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping(value = "/rent/", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @CrossOrigin
    public ResponseEntity<?> addPost(
            @RequestParam Map<String, String> info,
            @RequestPart(name = "files", required = false) MultipartFile[] files) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        Post postObj = mapper.readValue(info.get("post"), Post.class);

        PostRentDetail postRentDetailObj = mapper.readValue(info.get("postRentDetail"), PostRentDetail.class);

        postRentDetailObj.setPostId(postObj);
        postRentDetailObj.setImgImport(files);
        postObj.setPostRentDetail(postRentDetailObj);

        BindingResult resultPost = new BeanPropertyBindingResult(postObj, "post");
        BindingResult resultDetail = new BeanPropertyBindingResult(postRentDetailObj, "postRentDetail");

        resultPost = (BindingResult) postValidator.getValidateErrors(postObj, resultPost);
        resultDetail = (BindingResult) postRentValidator.getValidateErrors(postRentDetailObj, resultDetail);
        if (resultPost.hasErrors() || resultDetail.hasErrors()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        postObj = postService.preparePost(postObj);
        postService.addOrUpdatePost(postObj);
        List<Follow> followers = followService.getFollowers(postObj.getUserId().getUsername(), -1);
        for (Follow follower : followers) {
            if (follower.getFollowUserId().getIsConfirm() == true) {
                mailService.sendEmailNewPost(postObj, follower.getFollowUserId().getEmail().toString());
            }
        }
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PostMapping(value = "/find/", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @CrossOrigin
    public ResponseEntity<?> addPostFind(
            @RequestParam Map<String, String> info,
            @RequestPart(name = "files", required = false) MultipartFile[] files) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        Post postObj = mapper.readValue(info.get("post"), Post.class);

        PostFindDetail postFindDetailObj = mapper.readValue(info.get("postFindDetail"), PostFindDetail.class);

        postFindDetailObj.setPostId(postObj);
        postFindDetailObj.setImgImport(files);
        postObj.setPostFindDetail(postFindDetailObj);

        BindingResult resultPost = new BeanPropertyBindingResult(postObj, "post");
        BindingResult resultDetail = new BeanPropertyBindingResult(postFindDetailObj, "postFindDetail");

        resultPost = (BindingResult) postValidator.getValidateErrors(postObj, resultPost);
        resultDetail = (BindingResult) postFindValidator.getValidateErrors(postFindDetailObj, resultDetail);
        if (resultPost.hasErrors() || resultDetail.hasErrors()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        postObj = postService.preparePost(postObj);
        postService.addOrUpdatePost(postObj);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

  

    @GetMapping("/")
    @CrossOrigin
    public ResponseEntity<String> getPosts(@RequestParam Map<String, String> params) {
        params.put("isDeleted", "0");

        params.put("isAccepted", "accepted");
        if (params.get("page") == null) {
            params.put("page", "1");
        }
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

    @GetMapping("/count/")
    @CrossOrigin
    public ResponseEntity<Integer> getPostCounts(@RequestParam Map<String, String> params) {
        params.put("isDeleted", "0");
        params.put("isAccepted", "accepted");
        if (params.get("page") == null) {
            params.put("page", "1");
        }
        int count = postService.countPosts(params);
        ResponseEntity<Integer> result = new ResponseEntity<>(count, HttpStatus.OK);
        return result;
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
    public ResponseEntity<String> getComments(@PathVariable("slug") String slug, @RequestParam(value = "page", required = false) String page) {
        int currentPage = page != null? Integer.parseInt(page) : 1;
        List<Comment> comments = commentService.getComments(slug, currentPage);
        int pageSize = Integer.parseInt(env.getProperty("PAGE_SIZE"));
        int count = commentService.getCount(slug);
        int numOfPages = (int) Math.ceil(count * 1.0 / pageSize);
        try {
            Map<String, Object> response = new HashMap<>();
            response.put("pages", numOfPages);
            response.put("comments", comments);
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
    
    

}

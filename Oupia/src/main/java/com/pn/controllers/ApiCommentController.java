package com.pn.controllers;

import com.pn.pojo.Comment;
import com.pn.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
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
@RequestMapping(value = "/api/comments", produces = MediaType.APPLICATION_JSON_VALUE)
public class ApiCommentController {
    @Autowired
    private CommentService commentService;
    
    @PostMapping(path = "/")
    @CrossOrigin
    public ResponseEntity<Comment> addComment(@RequestBody Comment comment) {
        Comment createdComment = commentService.addComment(comment);
        return new ResponseEntity<>(createdComment, HttpStatus.CREATED);
    }
}

/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.pn.service.impl;

import com.pn.pojo.Comment;
import com.pn.repository.CommentRepository;
import com.pn.service.CommentService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author yuu
 */
@Service
public class CommentServiceImpl implements CommentService{
    @Autowired
    private CommentRepository commentRepository;
    @Override
    public Comment addComment(Comment cmt) {
        return commentRepository.addComment(cmt);
    }

    @Override
    public List<Comment> getComments(String slugPost, int page) {
        return commentRepository.getComments(slugPost, page);
    }

    @Override
    public int getCount(String slugPost) {
        return commentRepository.getCount(slugPost);
    }
    
}

/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.pn.repository;

import com.pn.pojo.Comment;
import java.util.List;

/**
 *
 * @author yuu
 */
public interface CommentRepository {
    Comment addComment(Comment cmt);
    List<Comment> getComments(String slugPost);
}

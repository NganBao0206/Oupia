/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.pn.service;

import com.pn.pojo.Comment;
import java.util.List;

/**
 *
 * @author yuu
 */
public interface CommentService {

    Comment addComment(Comment cmt);

    List<Comment> getComments(String slugPost, int page);

}

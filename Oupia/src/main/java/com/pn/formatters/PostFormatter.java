/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.pn.formatters;

import com.pn.pojo.Post;
import java.text.ParseException;
import java.util.Locale;
import org.springframework.format.Formatter;
import org.springframework.stereotype.Component;

/**
 *
 * @author yuu
 */
@Component
public class PostFormatter implements Formatter<Post> {

    @Override
    public String print(Post post, Locale locale) {
        return String.valueOf(post.getId());
    }

    @Override
    public Post parse(String postId, Locale locale) {
        if (postId.isBlank()) {
            return null;
        }
        try {
            return new Post(Integer.parseInt(postId));

        } catch(Exception e) {
            return null;
        }

    }

}

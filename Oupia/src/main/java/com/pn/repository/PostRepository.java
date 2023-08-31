/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.pn.repository;
import com.pn.pojo.Post;
import java.util.List;
import java.util.Map;

/**
 *
 * @author yuumm
 */
public interface PostRepository {

    List<Post> getPosts(Map<String, String> params);

    int countPosts(Map<String, String> params);

    boolean addOrUpdatePost(Post post);

    Post getPostBySlug(String slug);

    boolean deletePost(String slug);

    boolean destroyPost(String slug);

    boolean restorePost(String slug);
    List<String> findSlugsStartingWith(String slug);
    
}

/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.pn.service.impl;

import com.cloudinary.Cloudinary;
import com.cloudinary.Transformation;
import com.cloudinary.utils.ObjectUtils;
import com.github.slugify.Slugify;
import com.pn.pojo.Image;
import com.pn.pojo.Motel;
import com.pn.pojo.Post;
import com.pn.pojo.PostRentDetail;
import com.pn.pojo.User;
import com.pn.repository.MotelRepository;
import com.pn.repository.PostRepository;
import com.pn.service.MotelService;
import com.pn.service.PostService;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.CompletableFuture;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.hibernate.Hibernate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

/**
 *
 * @author yuu
 */
@Service
public class PostServiceImpl implements PostService {

    @Autowired
    private PostRepository postRepository;
    @Autowired
    private Slugify slugify;
    @Autowired
    private Cloudinary cloudinary;

    @Override
    public List<Post> getPosts(Map<String, String> params, List<String> type) {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }

    @Override
    public int countPosts(Map<String, String> params, List<String> type) {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }

    @Override
    public boolean addOrUpdatePost(Post post) {
        String slug = slugify.slugify(post.getTitle());
//        List<String> existingSlugs = motelRepository.findSlugsStartingWith(slug);
//        slug = slugUtils.generateUniqueSlug(slug, existingSlugs);
        post.setSlug(slug);
        PostRentDetail detail = post.getPostRentDetail();
        Set<Image> imgSet = post.getImageSet();
        if (imgSet == null) {
            imgSet = new HashSet<>();
        }
        if (detail.getImgImport() != null && detail.getImgImport().length > 0) {
            for (MultipartFile file : detail.getImgImport()) {
                if (file.isEmpty() == false) {
                    try {
                        if (!file.isEmpty()) {
                            Map res = this.cloudinary.uploader().upload(file.getBytes(), ObjectUtils.asMap("resource_type", "auto"));
                            String publicId = (String) res.get("public_id");
                            String url = cloudinary.url().generate(publicId);
                            Image img = new Image();
                            img.setImage(url);
                            img.setPostId(post);
                            imgSet.add(img);
                        }

                    } catch (IOException ex) {
                        Logger.getLogger(UserServiceImpl.class.getName()).log(Level.SEVERE, null, ex);
                    }
                }

            }
        }
        post.setImageSet(imgSet);
        return postRepository.addOrUpdatePost(post);
    }

    @Override
    public Post getPostBySlug(String slug) {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }

    @Override
    public boolean deletePost(String slug) {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }

    @Override
    public boolean destroyPost(String slug) {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }

    @Override
    public boolean restorePost(String slug) {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }

}

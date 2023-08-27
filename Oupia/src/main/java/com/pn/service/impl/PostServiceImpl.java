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
import com.pn.repository.ImageRepository;
import com.pn.repository.MotelRepository;
import com.pn.repository.PostRepository;
import com.pn.service.MotelService;
import com.pn.service.PostService;
import com.pn.utils.SlugUtils;
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
    private SlugUtils slugUtils;
    @Autowired
    private Cloudinary cloudinary;
    @Autowired
    private ImageRepository imageRepository;

    @Override
    public List<Post> getPosts(Map<String, String> params) {
        return postRepository.getPosts(params);
    }

    @Override
    public int countPosts(Map<String, String> params) {
        return postRepository.countPosts(params);
    }

    @Override
    public boolean addOrUpdatePost(Post post) {
        String slug = slugify.slugify(post.getTitle());
        List<String> existingSlugs = postRepository.findSlugsStartingWith(slug);
        slug = slugUtils.generateUniqueSlug(slug, existingSlugs);
        post.setSlug(slug);
        MultipartFile[] imgImports = null;
        if (post.getPostRentDetail() != null) {
            imgImports = post.getPostRentDetail().getImgImport();
        } else {
            imgImports = post.getPostFindDetail().getImgImport();
        }
        Set<Image> imgSet = post.getImageSet();
        if (imgSet == null) {
            imgSet = new HashSet<>();
        }
        if (imgImports != null && imgImports.length > 0) {
            for (MultipartFile file : imgImports) {
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
        return postRepository.getPostBySlug(slug);
    }

    @Override
    public boolean deletePost(String slug) {
        return postRepository.deletePost(slug);
    }

    @Override
    public boolean destroyPost(String slug) {
        Post post = getPostBySlug(slug);
        List<Image> images = imageRepository.getImagesByPost(post.getId());
        List<String> imgs = new ArrayList<>();
        images.forEach(i -> imgs.add(i.getImage()));        
        boolean result = postRepository.destroyPost(slug);
        if (result) {
            CompletableFuture.runAsync(() -> {
                List<String> publicIds = new ArrayList<>();
                imgs.forEach(i -> {
                    if (i != null) {
                        String[] part = i.split("/");
                        String publicId = part[part.length - 1];
                        publicIds.add(publicId);
                    }
                });
                try {
                    Map res = this.cloudinary.api().deleteResources(publicIds, ObjectUtils.asMap("invalidate", true));
                } catch (Exception ex) {
                    Logger.getLogger(MotelServiceImpl.class.getName()).log(Level.SEVERE, null, ex);
                }
            });
        }
        return result;
    }

    @Override
    public boolean restorePost(String slug) {
        return postRepository.restorePost(slug);
    }

}

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
import com.pn.service.MotelService;
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
public class MotelServiceImpl implements MotelService {

    @Autowired
    private MotelRepository motelRepository;
    @Autowired
    private MotelRepository postRepository;
    @Autowired
    private ImageRepository imageRepository;
    @Autowired
    private Cloudinary cloudinary;
    @Autowired
    private Slugify slugify;
    @Autowired
    private SlugUtils slugUtils;

    @Override
    public boolean addOrUpdateMotel(Motel motel) {
        prepareMotel(motel);
        return motelRepository.addOrUpdateMotel(motel);
    }
    
    @Override
    public Motel prepareMotel(Motel motel) {
         if (motel.getId() == null) {
            String slug = slugify.slugify(motel.getName());
            List<String> existingSlugs = motelRepository.findSlugsStartingWith(slug);
            slug = slugUtils.generateUniqueSlug(slug, existingSlugs);
            motel.setSlug(slug);
        }
         return motel;
    }

    @Override
    public List<Motel> getMotels(Map<String, String> params, List<String> status) {
        return motelRepository.getMotels(params, status);
    }

    @Override
    public int countMotels(Map<String, String> params, List<String> status) {
        return motelRepository.countMotels(params, status);
    }

    @Override
    public Motel getMotelBySlug(String slug) {
        return motelRepository.getMotelBySlug(slug);
    }

    @Override
    public boolean deleteMotel(String slug) {
        return motelRepository.deleteMotel(slug);
    }

    @Override
    public boolean destroyMotel(String slug) {
        Motel motel = getMotelBySlug(slug);
        List<String> images = imageRepository.getImagesByMotel(motel.getId());
        boolean result = motelRepository.destroyMotel(slug);
        if (result) {
            CompletableFuture.runAsync(() -> {
                List<String> publicIds = new ArrayList<>();
                images.forEach(image -> {
                    if (image != null) {
                        String[] part = image.split("/");
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
    public boolean restoreMotel(String slug) {
        return motelRepository.restoreMotel(slug);
    }

    @Override
    public boolean updateStatus(int motelId, String status) {
        return motelRepository.updateStatus(motelId, status);
    }
}

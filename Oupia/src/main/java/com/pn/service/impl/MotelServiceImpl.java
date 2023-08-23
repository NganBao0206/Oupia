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
import com.pn.pojo.User;
import com.pn.repository.MotelRepository;
import com.pn.service.MotelService;
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
    private Cloudinary cloudinary;
    @Autowired
    private Slugify slugify;

    @Override
    public boolean addOrUpdateMotel(Motel motel) {
        motel.setSlug(slugify.slugify(motel.getName()));
//        Set<Image> imgSet = motel.getImageSet();
//        if (imgSet == null) {
//            imgSet = new HashSet<>();
//        }
//        if (motel.getImgImport() != null && motel.getImgImport().length > 0) {
//            for (MultipartFile file : motel.getImgImport()) {
//                if (file.isEmpty() == false) {
//                    try {
//                        if (!file.isEmpty()) {
//                            Map res;
//                            res = this.cloudinary.uploader().upload(file.getBytes(), ObjectUtils.asMap("resource_type", "auto"));
//
//                            String publicId = (String) res.get("public_id");
//                            String url = cloudinary.url().generate(publicId);
//                            Image img = new Image();
//                            img.setImage(url);
//                            img.setMotelId(motel);
//                            imgSet.add(img);
//                        }
//
//                    } catch (IOException ex) {
//                        Logger.getLogger(UserServiceImpl.class.getName()).log(Level.SEVERE, null, ex);
//                    }
//                }
//
//            }
//        }

//        if (motel.getImgGoogle() != null && !motel.getImgGoogle().isEmpty()) {
//            for (String file : motel.getImgGoogle()) {
//                if (file != null) {
//                    try {
//                        Map res;
//                        res = this.cloudinary.uploader().upload(file, ObjectUtils.asMap("resource_type", "auto"));
//
//                        String publicId = (String) res.get("public_id");
//                        String url = cloudinary.url().generate(publicId);
//                        Image img = new Image();
//                        img.setImage(url);
//                        img.setMotelId(motel);
//                        imgSet.add(img);
//
//                    } catch (IOException ex) {
//                        Logger.getLogger(UserServiceImpl.class.getName()).log(Level.SEVERE, null, ex);
//                    }
//                }
//
//            }
//        }
//        motel.setImageSet(imgSet);
        return motelRepository.addOrUpdateMotel(motel);
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
//        Set<Image> imageSet = getImageSetOfMotel(motel.getId());
//        List<String> images = new ArrayList<>();
//        imageSet.forEach(image -> images.add(image.getImage()));
        boolean result = motelRepository.destroyMotel(slug);
//        if (result) {
//            CompletableFuture.runAsync(() -> {
//                List<String> publicIds = new ArrayList<>();
//                images.forEach(image -> {
//                    if (image != null) {
//                        String[] part = image.split("/");
//                        String publicId = part[part.length - 1];
//                        publicIds.add(publicId);
//                    }
//                });
//                try {
//                    Map res = this.cloudinary.api().deleteResources(publicIds, ObjectUtils.asMap("invalidate", true));
//                } catch (Exception ex) {
//                    Logger.getLogger(MotelServiceImpl.class.getName()).log(Level.SEVERE, null, ex);
//                }
//            });
//        }
        return result;
    }

    @Override
    public boolean restoreMotel(String slug) {
        return motelRepository.restoreMotel(slug);
    }

}

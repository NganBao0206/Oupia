/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.pn.service.impl;

import com.pn.pojo.Image;
import com.pn.repository.ImageRepository;
import com.pn.service.ImageService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author yuu
 */
@Service
public class ImageServiceImpl implements ImageService{
    @Autowired
    private ImageRepository imageRepository;
    @Override
    public List<Image> getImagesByPost(int postId) {
        return imageRepository.getImagesByPost(postId);
    }
    

    @Override
    public int countImage(int postId) {
        return imageRepository.countImage(postId);
    }

    @Override
    public Image getImageByPost(int postId) {
        return imageRepository.getImageByPost(postId);
    }

    @Override
    public String getImageByMotel(int motelId) {
        return imageRepository.getImageByMotel(motelId);
    }
    
}

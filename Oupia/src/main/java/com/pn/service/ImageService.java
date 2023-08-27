/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.pn.service;

import com.pn.pojo.Image;
import java.util.List;

/**
 *
 * @author yuu
 */
public interface ImageService {


    List<Image> getImagesByPost(int postId);
    Image getImageByPost(int postId);
    String getImageByMotel(int motelId);

    int countImage(int postId);
}

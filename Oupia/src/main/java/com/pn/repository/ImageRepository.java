/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.pn.repository;

import com.pn.pojo.Image;
import java.util.List;

/**
 *
 * @author yuu
 */
public interface ImageRepository {

    List<Image> getImagesByMotel(int motelId);
    Image getImageByMotel(int motelId);

    int countImage(int motelId);
}

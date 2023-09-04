/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.pn.service;

import com.pn.pojo.Motel;
import com.pn.pojo.Post;
import com.pn.pojo.User;

/**
 *
 * @author yuu
 */
public interface MultipleService {

    boolean addUserWithMotelPost(User user, Motel motel, Post post);

    boolean addMotelWithPost(Motel motel, Post post);
}

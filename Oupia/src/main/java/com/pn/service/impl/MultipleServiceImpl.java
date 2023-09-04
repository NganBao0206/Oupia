/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.pn.service.impl;

import com.pn.pojo.Motel;
import com.pn.pojo.Post;
import com.pn.pojo.User;
import com.pn.repository.MotelRepository;
import com.pn.repository.PostRepository;
import com.pn.repository.UserRepository;
import com.pn.service.MultipleService;
import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author yuu
 */
@Service
@Transactional
public class MultipleServiceImpl implements MultipleService {

    @Autowired
    private MotelRepository motelRepository;
    @Autowired
    private PostRepository postRepository;
    @Autowired
    private UserRepository userRepository;

    @Override
    public boolean addUserWithMotelPost(User user, Motel motel, Post post) {
        try {
            userRepository.addOrUpdateUser(user);
            motelRepository.addOrUpdateMotel(motel);
            postRepository.addOrUpdatePost(post);

            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public boolean addMotelWithPost(Motel motel, Post post) {
        try {
            motelRepository.addOrUpdateMotel(motel);
            postRepository.addOrUpdatePost(post);

            return true;
        } catch (Exception e) {
            return false;
        }
    }

}

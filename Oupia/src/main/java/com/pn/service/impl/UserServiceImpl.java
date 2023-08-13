/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.pn.service.impl;

import com.cloudinary.Cloudinary;
import com.cloudinary.Transformation;
import com.cloudinary.utils.ObjectUtils;
import com.pn.pojo.User;
import com.pn.repository.UserRepository;
import com.pn.service.UserService;
import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author yuumm
 */
@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private Cloudinary cloudinary;

    @Override
    public List<User> getUsers(Map<String, String> params, List<String> userRoles) {
        return userRepository.getUsers(params, userRoles);
    }

    @Override
    public int countUsers() {
        return userRepository.countUsers();
    }

    @Override
    public boolean addOrUpdateUser(User u) {
        u.setSlug(u.getUsername().replaceAll("\\._", "-"));
        if (!u.getFile().isEmpty()) {
            try {
                Map res;
                if (u.getAvatar() != null && !u.getAvatar().isEmpty()) {
                    String[] part = u.getAvatar().split("/");
                    String publicId = part[part.length - 1];
                    res = this.cloudinary.uploader().upload(u.getFile().getBytes(), ObjectUtils.asMap("resource_type", "auto", "public_id", publicId, "overwrite", true, "invalidate", true));
                } else {
                    res = this.cloudinary.uploader().upload(u.getFile().getBytes(), ObjectUtils.asMap("resource_type", "auto"));
                }
                String publicId = (String) res.get("public_id");
                String url = cloudinary.url().transformation(new Transformation().width(350).height(350).crop("fill")).generate(publicId);
                u.setAvatar(url);
            } catch (IOException ex) {
                Logger.getLogger(UserServiceImpl.class.getName()).log(Level.SEVERE, null, ex);
            }
        }
        return this.userRepository.addOrUpdateUser(u);
    }

    @Override
    public User getUserBySlug(String slug) {
        User user = this.userRepository.getUserBySlug(slug);
        if (user != null) {
            user.setConfirmPassword(user.getPassword());
        }
        return user;
    }

    @Override
    public boolean existsByUsername(String username, int id) {
        return this.userRepository.existsByUsername(username, id);
    }

}

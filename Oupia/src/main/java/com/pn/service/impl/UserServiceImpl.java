/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.pn.service.impl;

import com.cloudinary.Cloudinary;
import com.cloudinary.Transformation;
import com.cloudinary.utils.ObjectUtils;
import com.pn.enums.Status;
import com.pn.enums.UserRole;
import com.pn.pojo.User;
import com.pn.repository.UserRepository;
import com.pn.service.UserService;
import java.io.IOException;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.CompletableFuture;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author yuumm
 */
@Service("userDetailsService")
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private Cloudinary cloudinary;
    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Override
    public List<User> getUsers(Map<String, String> params, List<String> userRoles, List<String> status) {
        return userRepository.getUsers(params, userRoles, status);
    }

    @Override
    public int countUsers(Map<String, String> params, List<String> userRoles, List<String> status) {
        return userRepository.countUsers(params, userRoles, status);
    }

    @Override
    public boolean addOrUpdateUser(User u) {
        if (u.getId() == null) {
            if (u.getUserRole().equals(UserRole.TENANT.toString())) {
                u.setStatus(Status.ACCEPTED.toString());
            }
        }
        if (u.getOldPassword() == null || !u.getPassword().equals(u.getOldPassword())) {
            String hashedPassword = passwordEncoder.encode(u.getPassword());
            u.setPassword(hashedPassword);
        }
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
    public User getUserByUsername(String username) {
        User user = this.userRepository.getUserByUsername(username);
        if (user != null) {
            user.setConfirmPassword(user.getPassword());
            user.setOldPassword(user.getPassword());
        }
        return user;
    }

    @Override
    public boolean existsByUsername(String username, int id) {
        return this.userRepository.existsByUsername(username, id);
    }

    @Override
    public boolean deleteUser(String slug) {
        return this.userRepository.deleteUser(slug);
    }

    @Override
    public boolean destroyUser(String username) {
        User u = getUserByUsername(username);
        String avatar = u.getAvatar();
        boolean result = this.userRepository.destroyUser(username);
        if (result) {
            CompletableFuture.runAsync(() -> {
                if (result && avatar != null) {
                    String[] part = avatar.split("/");
                    String publicId = part[part.length - 1];
                    try {
                        Map res = this.cloudinary.uploader().destroy(publicId, ObjectUtils.asMap("invalidate", true));
                    } catch (IOException ex) {
                        Logger.getLogger(UserServiceImpl.class.getName()).log(Level.SEVERE, ex.getMessage(), ex);
                    }
                }
            });
        }
        return result;
    }

    @Override
    public boolean restoreUser(String username) {
        return this.userRepository.restoreUser(username);
    }

    @Override
    @Transactional(readOnly = true)
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User u = this.userRepository.getUserByUsername(username);
        if (u == null) {
            throw new UsernameNotFoundException("Invalid user!");
        }

        Set<GrantedAuthority> authorities = new HashSet<>();
        authorities.add(new SimpleGrantedAuthority(u.getUserRole()));

        return new org.springframework.security.core.userdetails.User(
                u.getUsername(), u.getPassword(), authorities);
    }
}

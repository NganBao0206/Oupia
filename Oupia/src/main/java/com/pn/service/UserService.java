/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.pn.service;

import java.util.List;
import com.pn.pojo.User;
import java.util.Map;
/**
 *
 * @author yuumm
 */
public interface UserService {
    List<User> getUsers(Map<String, String> params);
    int countUsers();
    boolean addOrUpdateUser(User u);
    User getUserBySlug(String slug);
    boolean existsByUsername(String username);
}

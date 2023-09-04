/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.pn.service;

import com.pn.pojo.Motel;
import com.pn.pojo.Post;
import java.util.List;
import com.pn.pojo.User;
import java.util.Map;
import org.springframework.security.core.userdetails.UserDetailsService;

/**
 *
 * @author yuumm
 */
public interface UserService extends UserDetailsService {

    List<User> getUsers(Map<String, String> params, List<String> userRoles, List<String> status);

    int countUsers(Map<String, String> params, List<String> userRoles, List<String> status);

    boolean addOrUpdateUser(User u);

    User getUserByUsername(String username);

    boolean existsByUsername(String username, int id);

    boolean deleteUser(String username);

    boolean destroyUser(String username);

    boolean restoreUser(String username);

    boolean authUser(String username, String password);
        
     User prepareUser(User u);

}

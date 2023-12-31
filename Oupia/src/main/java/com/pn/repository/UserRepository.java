/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.pn.repository;

import com.pn.pojo.User;
import java.util.List;
import java.util.Map;

/**
 *
 * @author yuumm
 */
public interface UserRepository {

    List<User> getUsers(Map<String, String> params, List<String> userRoles, List<String> status);

    int countUsers(Map<String, String> params, List<String> userRoles, List<String> status);

    boolean addOrUpdateUser(User u);

    User getUserByUsername(String username);

    boolean existsByUsername(String username, int id);

    boolean deleteUser(String username);

    boolean destroyUser(String username);

    boolean restoreUser(String username);
}

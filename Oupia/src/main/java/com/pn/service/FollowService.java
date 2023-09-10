/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.pn.service;

import com.pn.pojo.Follow;
import java.util.List;

/**
 *
 * @author yuu
 */
public interface FollowService {

    Follow getFollowing(String followUsername, String followingUsername);

    List<Follow> getFollowers(String username, int maxValue);

    List<Follow> getFollowings(String username, int maxValue);

    Follow addFollow(Follow follow);

    Boolean removeFollow(int followId);

    int getCountFollowers(String username);

    int getCountFollowings(String username);

    Follow getFollowById(int id);

}

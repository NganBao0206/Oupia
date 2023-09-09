/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.pn.service.impl;

import com.pn.pojo.Follow;
import com.pn.repository.FollowRepository;
import com.pn.service.FollowService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author yuu
 */
@Service
public class FollowServiceImpl implements FollowService{
    @Autowired
    private FollowRepository followRepository;
    
    @Override
    public Follow getFollowing(String followUsername, String followingUsername) {
        return this.followRepository.getFollowing(followUsername, followingUsername);
    }

    @Override
    public List<Follow> getFollowers(String username, int maxValue) {
        return this.followRepository.getFollowers(username, maxValue);
    }

    @Override
    public List<Follow> getFollowings(String username, int maxValue) {
        return this.followRepository.getFollowings(username, maxValue);
    }

    @Override
    public Follow addFollow(Follow follow) {
        return this.followRepository.addFollow(follow);
    }

    @Override
    public Boolean removeFollow(int followId) {
        return this.followRepository.removeFollow(followId);
    }

    @Override
    public int getCountFollowers(String username) {
        return this.followRepository.getCountFollowers(username);
    }

    @Override
    public int getCountFollowings(String username) {
        return this.followRepository.getCountFollowings(username);
    }

    @Override
    public Follow getFollowById(int id) {
        return this.followRepository.getFollowById(id);
    }
    
}

/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.pn.service.impl;

import com.pn.pojo.Favourite;
import com.pn.repository.FavouriteRepository;
import com.pn.service.FavouriteService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author yuu
 */
@Service
public class FavouriteServiceImpl implements FavouriteService{
    @Autowired
    private FavouriteRepository favouriteRepository;
    @Override
    public Favourite getFavourStatus(int userId, int postId) {
        return favouriteRepository.getFavourStatus(userId, postId);
    }

    @Override
    public List<Favourite> getFavouritesOfUser(int userId) {
        return favouriteRepository.getFavouritesOfUser(userId);
    }

    @Override
    public Favourite addFavourite(Favourite fav) {
        return favouriteRepository.addFavourite(fav);
    }

    @Override
    public Boolean removeFavourite(int favId) {
        return favouriteRepository.removeFavourite(favId);
    }

    @Override
    public Favourite getFavById(int id) {
        return favouriteRepository.getFavById(id);
    }
    
}

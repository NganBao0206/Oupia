/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.pn.service;

import com.pn.pojo.Favourite;
import java.util.List;

/**
 *
 * @author yuu
 */
public interface FavouriteService {
    Favourite getFavourStatus(int userId, int postId);
    List<Favourite> getFavouritesOfUser(int userId);
    Favourite addFavourite(Favourite fav);
    Favourite getFavById(int id);
    Boolean removeFavourite(int favId);
}

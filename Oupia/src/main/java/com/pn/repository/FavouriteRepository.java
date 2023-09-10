/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.pn.repository;

import com.pn.pojo.Favourite;
import com.pn.pojo.Post;
import java.util.List;
import java.util.Map;

/**
 *
 * @author yuu
 */
public interface FavouriteRepository {

    Favourite getFavourStatus(int userId, int postId);

    List<Post> getFavouritesOfUser(String username, Map<String, String> params);

    int getCountFavouritesOfUser(String username);

    Favourite addFavourite(Favourite fav);

    Favourite getFavById(int id);

    Boolean removeFavourite(int favId);
}

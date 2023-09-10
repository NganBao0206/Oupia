/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.pn.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.pn.pojo.Favourite;
import com.pn.pojo.Post;
import com.pn.pojo.User;
import com.pn.service.FavouriteService;
import com.pn.service.UserService;
import java.security.Principal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author yuu
 */
@RestController
@RequestMapping(value = "/api/favourites", produces = MediaType.APPLICATION_JSON_VALUE)
public class ApiFavouriteController {

    @Autowired
    private FavouriteService favouriteService;

    @Autowired
    private UserService userService;

    @Autowired
    private Environment env;

    @GetMapping(path = "/")
    @CrossOrigin
    public ResponseEntity<Favourite> getFavourite(@RequestParam("userId") int userId, @RequestParam("postId") int postId) {
        Favourite fav = favouriteService.getFavourStatus(userId, postId);
        if (fav != null) {
            return new ResponseEntity<>(fav, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }

    @GetMapping(path = "/user/")
    @CrossOrigin
    public ResponseEntity<String> getFavouritePostList(@RequestParam("username") String username, @RequestParam Map<String, String> params) {
        List<Post> favs = favouriteService.getFavouritesOfUser(username, params);
        if (favs != null) {
            int pageSize = Integer.parseInt(env.getProperty("PAGE_SIZE"));
            int count = favouriteService.getCountFavouritesOfUser(username);
            int pages = (int) Math.ceil(count * 1.0 / pageSize);
            try {
                Map<String, Object> response = new HashMap<>();
                response.put("pages", pages);
                response.put("posts", favs);
                response.put("total", count);
                ObjectMapper mapper = new ObjectMapper();
                String json = mapper.writeValueAsString(response);
                ResponseEntity<String> result = new ResponseEntity<>(json, HttpStatus.OK);
                return result;

            } catch (Exception e) {
                e.printStackTrace();
            }

        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);

    }

    @PostMapping(path = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    @CrossOrigin
    public ResponseEntity<Favourite> addFavourite(@RequestBody Favourite favourite, Principal user) {
        User u = userService.getUserByUsername(user.getName());
        Favourite fav = favouriteService.getFavourStatus(u.getId(), favourite.getPostId().getId());
        if (fav != null) {
            return new ResponseEntity<>(HttpStatus.FOUND);
        } else {
            favourite.setUserId(u);
            fav = favouriteService.addFavourite(favourite);
            if (fav != null) {
                return new ResponseEntity<>(fav, HttpStatus.CREATED);
            } else {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        }
    }

    @DeleteMapping(path = "/")
    @CrossOrigin
    public ResponseEntity<?> remove(@RequestParam("favId") int favId, Principal user) {
        try {
            Favourite fav = favouriteService.getFavById(favId);
            if (!fav.getUserId().getUsername().equals(user.getName())) {
                return new ResponseEntity<>(HttpStatus.FORBIDDEN);
            } else {
                Boolean rs = favouriteService.removeFavourite(favId);
                if (rs) {
                    return new ResponseEntity<>(HttpStatus.NO_CONTENT);
                } else {
                    return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
                }
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

}

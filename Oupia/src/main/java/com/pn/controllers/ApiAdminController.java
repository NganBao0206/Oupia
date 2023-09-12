package com.pn.controllers;

import com.pn.pojo.Comment;
import com.pn.pojo.Motel;
import com.pn.pojo.User;
import com.pn.service.CommentService;
import com.pn.service.ImageService;
import com.pn.service.MotelService;
import com.pn.service.PostService;
import com.pn.service.UserService;
import java.security.Principal;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
/**
 *
 * @author yuu
 */
@RestController
@RequestMapping(value = "/admin", produces = MediaType.APPLICATION_JSON_VALUE)
public class ApiAdminController {

    @Autowired
    private UserService userService;

    @Autowired
    private MotelService motelService;
    
     @Autowired
    private ImageService imageService;

    @Autowired
    private PostService postService;

    @GetMapping("/users/authenticated-user/")
    @CrossOrigin
    public ResponseEntity<User> getAuthenticatedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication != null && !(authentication instanceof AnonymousAuthenticationToken) && authentication.isAuthenticated()) {
            String currentPrincipalName = authentication.getName();
            User u = userService.getUserByUsername(currentPrincipalName);
            try {
                ResponseEntity<User> result = new ResponseEntity<>(u, HttpStatus.OK);
                return result;

            } catch (Exception e) {
                e.printStackTrace();
            }
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    @PatchMapping("/users-approval/{userId}/")
    public ResponseEntity<Void> approvalUser(@PathVariable("userId") int userId, @RequestParam("status") String status) {
        boolean rs = userService.updateStatus(userId, status);

        if (rs) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PatchMapping("/motels-approval/{motelId}/")
    public ResponseEntity<Void> approvalMotel(@PathVariable("motelId") int motelId, @RequestParam("status") String status) {
        boolean rs = motelService.updateStatus(motelId, status);

        if (rs) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/posts/bin/{slug}/")
    @CrossOrigin
    public ResponseEntity<Void> destroyPost(@PathVariable("slug") String slug) {
        boolean destroyed = postService.destroyPost(slug);

        if (destroyed) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PatchMapping("/posts/bin/{slug}/")
    @CrossOrigin
    public ResponseEntity<Void> restorePost(@PathVariable("slug") String slug) {
        boolean restored = postService.restorePost(slug);

        if (restored) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/posts/{slug}/")
    @CrossOrigin
    public ResponseEntity<Void> deletePost(@PathVariable("slug") String slug) {
        boolean deleted = postService.deletePost(slug);

        if (deleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PatchMapping("/users/bin/{username}/")
    @CrossOrigin
    public ResponseEntity<Void> restoreUser(@PathVariable("username") String username) {
        boolean restored = userService.restoreUser(username);

        if (restored) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/users/{username}/")
    @CrossOrigin
    public ResponseEntity<Void> deleteUser(@PathVariable("username") String username) {
        boolean deleted = userService.deleteUser(username);

        if (deleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/users/bin/{username}/")
    @CrossOrigin
    public ResponseEntity<Void> destroyUser(@PathVariable("username") String username) {
        boolean destroyed = userService.destroyUser(username);

        if (destroyed) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
     @PatchMapping("/motels/bin/{slug}/")
    @CrossOrigin
    public ResponseEntity<Void> restoreMotel(@PathVariable("slug") String slug) {
        boolean restored = motelService.restoreMotel(slug);

        if (restored) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/motels/{slug}/")
    @CrossOrigin
    public ResponseEntity<Void> deleteMotel(@PathVariable("slug") String slug) {
        boolean deleted = motelService.deleteMotel(slug);

        if (deleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/motels/bin/{slug}/")
    @CrossOrigin
    public ResponseEntity<Void> destroyMotel(@PathVariable("slug") String slug) {
        boolean destroyed = motelService.destroyMotel(slug);

        if (destroyed) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    @GetMapping("/motels")
    @CrossOrigin
    public ResponseEntity<List<Motel>> getMotels(@RequestParam Map<String, String> params,
            @RequestParam(name = "status", required = false) List<String> status) {
        List<Motel> motels = motelService.getMotels(params, status);
        motels.forEach(motel -> {
            String img = imageService.getImageByMotel(motel.getId());
            motel.setImage(img);
        });
        try {
            ResponseEntity<List<Motel>> result = new ResponseEntity<>(motels, HttpStatus.OK);
            return result;

        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }


}

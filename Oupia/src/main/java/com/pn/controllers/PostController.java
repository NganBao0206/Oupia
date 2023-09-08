/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.pn.controllers;

import com.pn.enums.Status;
import com.pn.pojo.Image;
import com.pn.pojo.Motel;
import com.pn.pojo.Post;
import com.pn.pojo.PostFindDetail;
import com.pn.pojo.PostRentDetail;
import com.pn.pojo.User;
import com.pn.service.ImageService;
import com.pn.service.MotelService;
import com.pn.service.PostService;
import com.pn.service.UserService;
import com.pn.validator.WebAppValidator;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

/**
 *
 * @author yuu
 */
@Controller
public class PostController {

    @Autowired
    private UserService userService;
    @Autowired
    private Environment env;
    @Autowired
    private MotelService motelService;
    @Autowired
    private PostService postService;
    @Autowired
    private ImageService imageService;
    @Autowired
    private WebAppValidator postRentValidator;
     @Autowired
    private WebAppValidator postFindValidator;

    @InitBinder("detailRent")
    public void initPostRentType(WebDataBinder binder) {
        binder.setValidator(postRentValidator);
    }
    
     @InitBinder("detailFind")
    public void initPostFindType(WebDataBinder binder) {
        binder.setValidator(postFindValidator);
    }

    @ModelAttribute("landlords")
    public List<User> getLandlordUser() {
        Map<String, String> params = new HashMap<>();
        params.put("isDeleted", "0");
        List<String> userRoles = new ArrayList<>();
        userRoles.add("LANDLORD");
        List<String> status = new ArrayList<>();
        status.add("ACCEPTED");
        List<User> users = userService.getUsers(params, userRoles, status);
        return users;
    }

    @ModelAttribute("tenants")
    public List<User> getTenantUser() {
        Map<String, String> params = new HashMap<>();
        params.put("isDeleted", "0");
        List<String> userRoles = new ArrayList<>();
        userRoles.add("TENANT");
        List<User> users = userService.getUsers(params, userRoles, null);
        return users;
    }

    @ModelAttribute("status")
    public Status[] getStatus() {
        return Status.values();
    }

    @RequestMapping(value = "/posts")
    public String posts(Model model, @RequestParam Map<String, String> params) {

        params.put("isDeleted", "0");
        if (params.get("page") == null) {
            params.put("page", "1");
        }

        int count = this.postService.countPosts(params);
        int pageSize = Integer.parseInt(env.getProperty("PAGE_SIZE"));

        List<Post> posts = postService.getPosts(params);
        model.addAttribute("posts", posts);
        model.addAttribute("pages", Math.ceil(count * 1.0 / pageSize));
        model.addAttribute("params", params);

        return "posts";
    }

    @RequestMapping(value = "/posts/rent/storage")
    public String addPostRent(Model model) {
        Post post = new Post();
        PostRentDetail detail = new PostRentDetail();
        detail.setPostId(post);
        post.setPostRentDetail(detail);
        model.addAttribute("detailRent", detail);
        return "postRentDetail";
    }

    @RequestMapping(value = "/posts/find/storage")
    public String addPostFind(Model model) {
        Post post = new Post();
        PostFindDetail detail = new PostFindDetail();
        detail.setPostId(post);
        post.setPostFindDetail(detail);
        model.addAttribute("detailFind", detail);
        return "postFindDetail";
    }

    @PostMapping("/posts/rent/storage")
    public String addRent(@ModelAttribute(value = "detailRent") @Valid PostRentDetail detail, BindingResult rs, RedirectAttributes redirectAttributes) {
        if (!rs.hasErrors()) {
            Post post = detail.getPostId();
            post.setPostRentDetail(detail);
            if (this.postService.addOrUpdatePost(post)) {
                redirectAttributes.addFlashAttribute("successMessage", "Thêm/sửa thành công nhà trọ.");
                return "redirect:/posts";
            }
        }
        return "postRentDetail";
    }

    @PostMapping("/posts/find/storage")
    public String addFind(@ModelAttribute(value = "detailFind") @Valid PostFindDetail detail, BindingResult rs, RedirectAttributes redirectAttributes) {
        if (!rs.hasErrors()) {
            Post post = detail.getPostId();
            post.setPostFindDetail(detail);
            if (this.postService.addOrUpdatePost(post)) {
                redirectAttributes.addFlashAttribute("successMessage", "Thêm/sửa thành công nhà trọ.");
                return "redirect:/posts";
            }
        }
        return "postFindDetail";
    }
    

    @PostMapping("/posts/storage/{slug}")
    public String edit(@ModelAttribute(value = "post") @Valid Post post, BindingResult rs, RedirectAttributes redirectAttributes) {
        if (!rs.hasErrors()) {
            if (this.postService.addOrUpdatePost(post) == true) {
                redirectAttributes.addFlashAttribute("successMessage", "Thêm/sửa thành công nhà trọ.");
                return "redirect:/posts";
            }
        }
        return "postRentDetail";
    }

    @GetMapping(value = "/posts/rent/storage/{slug}")
    public String editPostRent(Model model, @PathVariable(value = "slug") String slug) {
        Post post = this.postService.getPostBySlug(slug);
        if (post == null) {
            return "error";
        }
        model.addAttribute("detailRent", post.getPostRentDetail());
        return "postRentDetail";
    }
    
    @GetMapping(value = "/posts/find/storage/{slug}")
    public String editPostFind(Model model, @PathVariable(value = "slug") String slug) {
        Post post = this.postService.getPostBySlug(slug);
        if (post == null) {
            return "error";
        }
        model.addAttribute("detailFind", post.getPostFindDetail());
        return "postFindDetail";
    }

    @RequestMapping(value = "/posts/bin")
    public String deletedPosts(Model model, @RequestParam Map<String, String> params,
            @RequestParam(name = "postType", required = false) List<String> postType) {

        params.put("isDeleted", "1");
        if (params.get("page") == null) {
            params.put("page", "1");
        }

        int count = this.postService.countPosts(params);
        int pageSize = Integer.parseInt(env.getProperty("PAGE_SIZE"));

        List<Post> posts = postService.getPosts(params);

        model.addAttribute("posts", posts);
        model.addAttribute("pages", Math.ceil(count * 1.0 / pageSize));
        model.addAttribute("postTypeParams", postType);
        model.addAttribute("params", params);

        return "posts";
    }
}

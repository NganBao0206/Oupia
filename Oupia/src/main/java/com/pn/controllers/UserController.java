package com.pn.controllers;

import com.pn.enums.Gender;
import com.pn.enums.Status;
import com.pn.enums.UserRole;
import com.pn.pojo.Motel;
import com.pn.pojo.Post;
import com.pn.pojo.User;
import com.pn.service.ImageService;
import com.pn.service.MotelService;
import com.pn.service.MultipleService;
import com.pn.service.PostService;
import com.pn.service.UserService;
import com.pn.validator.WebAppValidator;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.propertyeditors.CustomDateEditor;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
/**
 *
 * @author yuumm
 */
@Controller
public class UserController {

    @Autowired
    private UserService userService;
    @Autowired
    private PostService postService;
    @Autowired
    private ImageService imageService;

    @Autowired
    private Environment env;
    @Autowired
    private WebAppValidator userValidator;

    @InitBinder
    public void initBinder(WebDataBinder binder) {
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        binder.registerCustomEditor(Date.class, new CustomDateEditor(dateFormat, true));
        binder.setValidator(userValidator);
    }

    @ModelAttribute("userRoles")
    public UserRole[] getUserRoles() {
        return UserRole.values();
    }

    @ModelAttribute("genders")
    public Gender[] getGenders() {
        return Gender.values();
    }

    @ModelAttribute("status")
    public Status[] getStatus() {
        return Status.values();
    }

    @RequestMapping(value = "/users-approval/{username}")
    public String approval(Model model, @PathVariable(value = "username") String username) {
        User u = userService.getUserByUsername(username);
        if (!u.getStatus().equals(Status.PENDING.toString())) {
            return "redirect:/users";
        }
        Map<String, String> params = new HashMap<>();
        params.put("username", username);
        params.put("isDeleted", "0");
        List<Post> post = postService.getPosts(params);
        List<String> images = imageService.getImagesBySlugPost(post.get(0).getSlug());
        model.addAttribute("post", post.get(0));
        model.addAttribute("motel", post.get(0).getPostRentDetail().getMotelId());
        model.addAttribute("user", u);
        model.addAttribute("images", images);

        return "approval";
    }

    @RequestMapping(value = "/users")
    public String users(Model model, @RequestParam Map<String, String> params,
            @RequestParam(name = "userRole", required = false) List<String> userRoles,
            @RequestParam(name = "status", required = false) List<String> status) {

        params.put("isDeleted", "0");
        if (params.get("page") == null) {
            params.put("page", "1");
        }

        int count = this.userService.countUsers(params, userRoles, status);
        int pageSize = Integer.parseInt(env.getProperty("PAGE_SIZE"));

        List<User> u = userService.getUsers(params, userRoles, status);

        model.addAttribute("users", u);
        model.addAttribute("pages", Math.ceil(count * 1.0 / pageSize));
        model.addAttribute("userRoleParams", userRoles);
        model.addAttribute("statusParams", status);
        model.addAttribute("params", params);

        return "users";
    }

    @RequestMapping(value = "/users-approval")
    public String users(Model model, @RequestParam Map<String, String> params) {

        params.put("isDeleted", "0");
        if (params.get("page") == null) {
            params.put("page", "1");
        }

        List<String> userRole = new ArrayList<>();
        userRole.add("LANDLORD");

        List<String> status = new ArrayList<>();
        status.add("PENDING");

        int count = this.userService.countUsers(params, userRole, status);
        int pageSize = Integer.parseInt(env.getProperty("PAGE_SIZE"));

        List<User> u = userService.getUsers(params, userRole, status);

        model.addAttribute("users", u);
        model.addAttribute("pages", Math.ceil(count * 1.0 / pageSize));
        model.addAttribute("params", params);

        return "usersApproval";
    }

    @RequestMapping(value = "/users/bin")
    public String deletedUsers(Model model, @RequestParam Map<String, String> params,
            @RequestParam(name = "userRole", required = false) List<String> userRoles,
            @RequestParam(name = "status", required = false) List<String> status) {

        params.put("isDeleted", "1");
        if (params.get("page") == null) {
            params.put("page", "1");
        }

        int count = this.userService.countUsers(params, userRoles, status);
        int pageSize = Integer.parseInt(env.getProperty("PAGE_SIZE"));

        List<User> u = userService.getUsers(params, userRoles, status);

        model.addAttribute("users", u);
        model.addAttribute("pages", Math.ceil(count * 1.0 / pageSize));
        model.addAttribute("test", count);
        model.addAttribute("userRoleParams", userRoles);
        model.addAttribute("statusParams", status);
        model.addAttribute("params", params);

        return "users";
    }

    @RequestMapping(value = "/users/storage")
    public String addUser(Model model) {
        model.addAttribute("user", new User());
        return "userDetail";
    }

    @RequestMapping(value = "/error")
    public String error() {
        return "error";
    }

    @GetMapping("/users/storage/{username}")
    public String update(Model model, @PathVariable(value = "username") String username) {
        User u = this.userService.getUserByUsername(username);
        if (u == null) {
            return "error";
        }
        model.addAttribute("user", u);
        return "userDetail";
    }

    @PostMapping("/users/storage")
    public String add(@ModelAttribute(value = "user") @Valid User u, BindingResult rs, RedirectAttributes redirectAttributes) {
        if (!rs.hasErrors()) {
            System.out.println("ok");
            if (this.userService.addOrUpdateUser(u) == true) {
                redirectAttributes.addFlashAttribute("successMessage", "Thêm/sửa thành công người dùng.");
                return "redirect:/users";
            }
        }
        return "userDetail";
    }

    @GetMapping("/login")
    public String login() {
        return "login";
    }
}

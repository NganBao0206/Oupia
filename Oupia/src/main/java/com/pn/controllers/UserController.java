package com.pn.controllers;

import com.pn.enums.UserRole;
import com.pn.pojo.User;
import com.pn.service.UserService;
import com.pn.validator.WebAppValidator;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
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
    
    @RequestMapping(value = "/users")
    public String users(Model model, @RequestParam Map<String, String> params) {

        int count = this.userService.countUsers();
        int pageSize = Integer.parseInt(env.getProperty("PAGE_SIZE"));
        List<User> u = userService.getUsers(params);
      
        model.addAttribute("users", u);
        model.addAttribute("pages", Math.ceil(count*1.0/pageSize));
        model.addAttribute("test", count);

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
    
    @GetMapping("/users/storage/{slug}")
    public String update(Model model, @PathVariable(value = "slug") String slug) {
        User u = this.userService.getUserBySlug(slug);
        if (u == null) 
            return "error";
        model.addAttribute("user", u);
        return "userDetail";
    }
    
    @PostMapping("/users/storage")
    public String add(@ModelAttribute(value = "user") @Valid User u, BindingResult rs) {
        if (!rs.hasErrors()) {
            System.out.println("ok");
            if (this.userService.addOrUpdateUser(u) == true)
                return "redirect:/users";
        }
            
        return "userDetail";
    }
}

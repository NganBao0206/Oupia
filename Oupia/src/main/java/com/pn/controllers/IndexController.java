/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.pn.controllers;

import com.pn.pojo.User;
import com.pn.service.UserService;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

/**
 *
 * @author yuumm
 */
@Controller
public class IndexController {

   

    @RequestMapping(value = "/")
    public String index(Model model) {
        model.addAttribute("message", "nene");
        return "index";
    }
    
     @RequestMapping(value = "/map")
    public String map(Model model) {
        model.addAttribute("message", "nene");
        return "testMap";
    }
  
}

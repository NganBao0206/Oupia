/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.pn.controllers;

import com.pn.components.MailService;
import com.pn.pojo.User;
import com.pn.service.UserService;
import java.time.Year;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.NoHandlerFoundException;

/**
 *
 * @author yuumm
 */
@Controller
public class IndexController {
   
    
    @RequestMapping(value = "/")
    public String index(Model model) {
        Year currentYear = Year.now();
        model.addAttribute("currentYear", currentYear.getValue());
        return "index";
    }

    @RequestMapping(value = "/map")
    public String map(Model model) {
        model.addAttribute("message", "nene");
        return "testMap";
    }

    @ExceptionHandler(NoHandlerFoundException.class)
    public String handleNotFoundError() {
        return "error";
    }

}

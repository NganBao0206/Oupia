/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.pn.controllers;

import com.pn.enums.Status;
import com.pn.pojo.Motel;
import com.pn.pojo.User;
import com.pn.service.ImageService;
import com.pn.service.MotelService;
import com.pn.service.UserService;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
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
public class MotelController {

    @Autowired
    private UserService userService;
    @Autowired
    private Environment env;
    @Autowired
    private MotelService motelService;
    @Autowired
    private ImageService imageService;

    @ModelAttribute("users")
    public List<User> getOwnerUser() {
        Map<String, String> params = new HashMap<>();
        params.put("isDeleted", "0");
        List<String> userRoles = new ArrayList<>();
        userRoles.add("LANDLORD");
        List<String> status = new ArrayList<>();
        status.add("ACCEPTED");
        List<User> users = userService.getUsers(params, userRoles, status);
        return users;
    }

    @ModelAttribute("status")
    public Status[] getStatus() {
        return Status.values();
    }

    @RequestMapping(value = "/motels")
    public String motels(Model model, @RequestParam Map<String, String> params,
            @RequestParam(name = "status", required = false) List<String> status) {

        params.put("isDeleted", "0");
        if (params.get("page") == null) {
            params.put("page", "1");
        }

        int count = this.motelService.countMotels(params, status);
        int pageSize = Integer.parseInt(env.getProperty("PAGE_SIZE"));

        List<Motel> motels = motelService.getMotels(params, status);
        for (Motel motel : motels) {
            motel.setImage(imageService.getImageByMotel(motel.getId()).getImage());
        }
        model.addAttribute("motels", motels);
        model.addAttribute("pages", Math.ceil(count * 1.0 / pageSize));
        model.addAttribute("statusParams", status);
        model.addAttribute("params", params);

        return "motels";
    }

    @RequestMapping(value = "/motels/storage")
    public String motel(Model model) {
        Motel motel = new Motel();
        model.addAttribute("motel", motel);
        return "motelDetail";
    }

    @GetMapping(value = "/motels/storage/{slug}")
    public String motelDetail(Model model, @PathVariable(value = "slug") String slug) {
        Motel motel = this.motelService.getMotelBySlug(slug);
        if (motel == null) {
            return "error";
        }
        model.addAttribute("motel", motel);
        return "motelDetail";
    }

    @PostMapping("/motels/storage/")
    public String add(@ModelAttribute(value = "motel") @Valid Motel motel, BindingResult rs, RedirectAttributes redirectAttributes) {
        if (!rs.hasErrors()) {
            System.out.println("ok");
            if (this.motelService.addOrUpdateMotel(motel) == true) {
                redirectAttributes.addFlashAttribute("successMessage", "Thêm/sửa thành công nhà trọ.");
                return "redirect:/motels";
            }
        }
        return "motelDetail";
    }

    @RequestMapping(value = "/motels/bin")
    public String deletedUsers(Model model, @RequestParam Map<String, String> params,
            @RequestParam(name = "status", required = false) List<String> status) {

        params.put("isDeleted", "1");
        if (params.get("page") == null) {
            params.put("page", "1");
        }

        int count = this.motelService.countMotels(params, status);
        int pageSize = Integer.parseInt(env.getProperty("PAGE_SIZE"));

        List<Motel> motels = motelService.getMotels(params, status);
        for (Motel motel : motels) {
            motel.setImage(imageService.getImageByMotel(motel.getId()).getImage());
        }
        model.addAttribute("motels", motels);
        model.addAttribute("pages", Math.ceil(count * 1.0 / pageSize));
        model.addAttribute("statusParams", status);
        model.addAttribute("params", params);

        return "motels";
    }
}

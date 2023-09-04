/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.pn.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.pn.service.StatService;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author genji
 */
@RestController
@RequestMapping(value = "/api/stats", produces = MediaType.APPLICATION_JSON_VALUE)
public class ApiStatController {

    @Autowired
    private StatService statService;

    @GetMapping("/month/")
    @CrossOrigin
    public ResponseEntity<String> userStatsByMonth(Model model, @RequestParam(required = false) String year) {
        Map<String, String> params = new HashMap<>();
        params.put("year", year);
        Map<Integer, List<Object[]>> userStats = statService.statUserByMonth(params);
        try {
            ObjectMapper mapper = new ObjectMapper();
            String json = mapper.writeValueAsString(userStats);
            ResponseEntity<String> result = new ResponseEntity<>(json, HttpStatus.OK);
            return result;

        } catch (Exception e) {
            e.printStackTrace();
        }

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/quarter/")
    @CrossOrigin
    public ResponseEntity<String> userStatsByQuarter(Model model, @RequestParam(required = false) String year) {
        Map<String, String> params = new HashMap<>();
        params.put("year", year);
        Map<Integer, List<Object[]>> userStats = statService.statUserByQuarter(params);
        try {
            ObjectMapper mapper = new ObjectMapper();
            String json = mapper.writeValueAsString(userStats);
            ResponseEntity<String> result = new ResponseEntity<>(json, HttpStatus.OK);
            return result;

        } catch (Exception e) {
            e.printStackTrace();
        }

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/year/")
    @CrossOrigin
    public ResponseEntity<String> userStatsByYear(Model model) {
        Map<Integer, List<Object[]>> userStats = statService.statUserByYear();
        try {
            ObjectMapper mapper = new ObjectMapper();
            String json = mapper.writeValueAsString(userStats);
            ResponseEntity<String> result = new ResponseEntity<>(json, HttpStatus.OK);
            return result;

        } catch (Exception e) {
            e.printStackTrace();
        }

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}

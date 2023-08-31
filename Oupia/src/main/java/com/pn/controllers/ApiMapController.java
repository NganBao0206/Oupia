/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.pn.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

/**
 *
 * @author yuu
 */
@RestController
@RequestMapping(value = "/api/map", produces = MediaType.APPLICATION_JSON_VALUE)
public class ApiMapController {

    @Autowired
    private Environment env;
    private final String GOONG_AUTOCOMPLETE_URL = "https://rsapi.goong.io/Place/AutoComplete";
    private final String GOONG_DETAIL_URL = "https://rsapi.goong.io/Place/Detail";

    private final RestTemplate restTemplate = new RestTemplate();

    @GetMapping("/autocomplete/")
    @CrossOrigin
    public ResponseEntity<String> autocomplete(
            @RequestParam String input,
            @RequestParam String sessionToken) {
        try {
            String apiKey = env.getProperty("GOONG_API_KEY");
            String apiUrl = GOONG_AUTOCOMPLETE_URL + "?input=" + input + "&api_key=" + apiKey + "&sessionToken=" + sessionToken;
            ResponseEntity<String> responseEntity = restTemplate.getForEntity(apiUrl, String.class);
            return ResponseEntity.ok(responseEntity.getBody());
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }
    
    @GetMapping("/detail/")
    @CrossOrigin
    public ResponseEntity<String> detail(
            @RequestParam String placeId) {
        try {
            String apiKey = env.getProperty("GOONG_API_KEY");
            String apiUrl = GOONG_DETAIL_URL + "?place_id=" + placeId + "&api_key=" + apiKey;
            ResponseEntity<String> responseEntity = restTemplate.getForEntity(apiUrl, String.class);
            return ResponseEntity.ok(responseEntity.getBody());
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }
}

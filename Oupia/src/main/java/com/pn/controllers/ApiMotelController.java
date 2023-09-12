package com.pn.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.pn.pojo.Motel;
import com.pn.pojo.Post;
import com.pn.pojo.PostRentDetail;
import com.pn.service.ImageService;
import com.pn.service.MotelService;
import com.pn.service.MultipleService;
import com.pn.service.PostService;
import com.pn.validator.WebAppValidator;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BeanPropertyBindingResult;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
/**
 *
 * @author yuu
 */
@RestController
@RequestMapping(value = "/api/motels", produces = MediaType.APPLICATION_JSON_VALUE)
public class ApiMotelController {

    @Autowired
    private MultipleService multipleService;
    @Autowired
    private MotelService motelService;
    @Autowired
    private PostService postService;
    @Autowired
    private ImageService imageService;
    @Autowired
    private WebAppValidator postValidator;
    @Autowired
    private WebAppValidator postRentValidator;
    @Autowired
    private WebAppValidator motelValidator;

   

    @GetMapping("/")
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

    @PostMapping(value = "/", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @CrossOrigin
    public ResponseEntity<?> addMotel(
            @RequestParam Map<String, String> info,
            @RequestPart(name = "files", required = false) MultipartFile[] files) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        Motel motelObj = mapper.readValue(info.get("motel"), Motel.class);
        Post postObj = mapper.readValue(info.get("post"), Post.class);
        PostRentDetail postRentDetailObj = mapper.readValue(info.get("postRentDetail"), PostRentDetail.class);

        postRentDetailObj.setMotelId(motelObj);
        postRentDetailObj.setPostId(postObj);
        postRentDetailObj.setImgImport(files);
        postObj.setPostRentDetail(postRentDetailObj);

        BindingResult resultMotel = new BeanPropertyBindingResult(motelObj, "motel");
        BindingResult resultPost = new BeanPropertyBindingResult(postObj, "post");
        BindingResult resultDetail = new BeanPropertyBindingResult(postRentDetailObj, "postRentDetail");
        
        resultMotel = (BindingResult) motelValidator.getValidateErrors(motelObj, resultMotel);
        resultPost = (BindingResult) postValidator.getValidateErrors(postObj, resultPost);
        resultDetail = (BindingResult) postRentValidator.getValidateErrors(postRentDetailObj, resultDetail);
        if (resultPost.hasErrors() || resultDetail.hasErrors() || resultMotel.hasErrors()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        motelObj = motelService.prepareMotel(motelObj);
        postObj = postService.preparePost(postObj);
        multipleService.addMotelWithPost(motelObj, postObj);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

}

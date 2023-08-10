///*
// * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
// * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
// */
//package com.pn.validator;
//
//import com.pn.pojo.User;
//import java.util.Set;
//import javax.validation.ConstraintViolation;
//import org.springframework.validation.Errors;
//import org.springframework.validation.Validator;
//
///**
// *
// * @author yuumm
// */
//public class DobValidator implements Validator{
//
//    @Override
//    public boolean supports(Class<?> clazz) {
//        return User.class.isAssignableFrom(clazz);
//    }
//
//    @Override
//    public void validate(Object target, Errors errors) {
//         User user = (User) target;
//        
//        if  (!user.getDob().) {
//            errors.rejectValue("confirmPassword", "user.confirmPassword.valid");
//        }
//    }
//    
//}

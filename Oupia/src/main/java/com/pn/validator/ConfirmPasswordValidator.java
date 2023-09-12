/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.pn.validator;

import com.pn.pojo.User;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

/**
 *
 * @author yuumm
 */
@Component
public class ConfirmPasswordValidator implements Validator{

    @Override
    public boolean supports(Class<?> clazz) {
        return User.class.isAssignableFrom(clazz);
    }

    @Override
    public void validate(Object target, Errors errors) {
        User user = (User) target;
        
        if  (user.getConfirmPassword() != null && !user.getConfirmPassword().equals(user.getPassword())) {
            errors.rejectValue("confirmPassword", "user.confirmPassword.valid");
        }
    }
    
}

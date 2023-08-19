/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.pn.validator;

import com.pn.pojo.User;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

/**
 *
 * @author yuu
 */
public class PasswordValidator implements Validator {

    @Override
    public boolean supports(Class<?> clazz) {
        return User.class.isAssignableFrom(clazz);
    }

    @Override
    public void validate(Object target, Errors errors) {
        User user = (User) target;
        String regex = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*\\_\\-+=])[A-Za-z\\d!@#$%^&*\\_\\-+=]+$";
        if ((user.getOldPassword() == null || !user.getPassword().equals(user.getOldPassword())) && !user.getPassword().matches(regex)) {
            errors.rejectValue("password", "user.password.pattern");
        }
    }

}

package com.pn.validator;

import com.pn.pojo.User;
import com.pn.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

@Component
public class UsernameValidator implements Validator {

    private final UserService userService;

    @Autowired
    public UsernameValidator(UserService userService) {
        this.userService = userService;
    }
    
    @Override
    public boolean supports(Class<?> clazz) {
        return User.class.isAssignableFrom(clazz);
    }

    @Override
    public void validate(Object target, Errors errors) {
        User user = (User) target;
        int id = user.getId() != null? user.getId() : -1;
        if (userService.existsByUsername(user.getUsername(), id)) {
            errors.rejectValue("username", "user.username.exist");
        }
    }

}

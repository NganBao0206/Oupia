package com.pn.validator
import com.pn.pojo.User
import java.util.Set;
import javax.validation.ConstraintViolation;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

public class UsernameValidator implements Validator{
   @Autowired
   UserService userService;
   @Override
   public boolean supports(Class<?> clazz) {
       return User.class.isAssignableFrom(clazz);
   }

   @Override
   public void validate(Object target, Errors errors) {
        User user = (User) target;
       
       if  (userService.existsByUsername(user.getUsername())) {
           errors.rejectValue("username", "user.username.exist");
       }
   }
   
}

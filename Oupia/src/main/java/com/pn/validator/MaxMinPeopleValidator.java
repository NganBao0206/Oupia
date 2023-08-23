package com.pn.validator;

import com.pn.pojo.PostRentDetail;
import com.pn.pojo.User;
import com.pn.service.UserService;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

@Component
public class MaxMinPeopleValidator implements Validator {

    @Override
    public boolean supports(Class<?> clazz) {
        return PostRentDetail.class.isAssignableFrom(clazz);
    }

    @Override
    public void validate(Object target, Errors errors) {
        PostRentDetail detail = (PostRentDetail) target;
        if (Optional.ofNullable(detail.getMaxPeople()).isPresent()
                && Optional.ofNullable(detail.getMinPeople()).isPresent()
                && detail.getMaxPeople() < detail.getMinPeople()) {
            errors.rejectValue("maxPeople", "postRentDetail.maxPeople.minMax");
        };
    }

}

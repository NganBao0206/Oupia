package com.pn.validator;

import com.pn.pojo.Post;
import com.pn.pojo.PostRentDetail;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

@Component
public class ImagesValidator implements Validator {

    @Override
    public boolean supports(Class<?> clazz) {
        return PostRentDetail.class.isAssignableFrom(clazz);
    }

    @Override
    public void validate(Object target, Errors errors) {
        PostRentDetail detail = (PostRentDetail) target;
        if (detail.getPostId()!= null) {
            Post post = detail.getPostId();
            int countNewImages = detail.getImgImport() != null ? detail.getImgImport().length : 0;
            int countOldImages = post.getImageSet() != null ? post.getImageSet().size() : 0;
            if (countNewImages + countOldImages < 3) {
                errors.rejectValue("imgImport", "post.imageSet.size");
            }
        }
    }

}

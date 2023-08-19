/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.pn.formatters;

import com.pn.pojo.User;
import java.text.ParseException;
import java.util.Locale;
import org.springframework.format.Formatter;
import org.springframework.stereotype.Component;

/**
 *
 * @author yuu
 */
@Component
public class UserFormatter implements Formatter<User> {

    @Override
    public String print(User user, Locale locale) {
        return String.valueOf(user.getId());
    }

    @Override
    public User parse(String userId, Locale locale) {
        if (userId.isBlank()) {
            return null;
        }
        try {
            return new User(Integer.parseInt(userId));

        } catch(Exception e) {
            return null;
        }

    }

}

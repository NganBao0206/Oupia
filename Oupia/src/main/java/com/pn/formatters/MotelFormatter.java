/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.pn.formatters;

import com.pn.pojo.Motel;
import java.text.ParseException;
import java.util.Locale;
import org.springframework.format.Formatter;
import org.springframework.stereotype.Component;

/**
 *
 * @author yuu
 */
@Component
public class MotelFormatter implements Formatter<Motel> {

    @Override
    public String print(Motel motel, Locale locale) {
        return String.valueOf(motel.getId());
    }

    @Override
    public Motel parse(String motelId, Locale locale) {
        if (motelId.isBlank()) {
            return null;
        }
        try {
            return new Motel(Integer.parseInt(motelId));

        } catch(Exception e) {
            return null;
        }

    }

}

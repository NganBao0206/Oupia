/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.pn.utils;

/**
 *
 * @author yuumm
 */
public class UserUtils {
    public String toSlug(String text) {
        return text.replaceAll("\\.", "-");
    }
}

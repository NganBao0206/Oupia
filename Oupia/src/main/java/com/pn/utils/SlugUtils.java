/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.pn.utils;

import java.util.List;
import org.springframework.stereotype.Component;

/**
 *
 * @author yuu
 */
@Component
public class SlugUtils {

    public String generateUniqueSlug(String baseSlug, List<String> existingSlugs) {
        if (existingSlugs.size() > 0) {
            int maxCount = 0;

            for (String existingSlug : existingSlugs) {
                String[] parts = existingSlug.split("-");
                try {
                    int count = Integer.parseInt(parts[parts.length - 1]);
                    maxCount = Math.max(maxCount, count);
                } catch (NumberFormatException e) {
                    // Không phải là một số, bỏ qua
                }
            }
            return baseSlug + "-" + (maxCount + 1);
        }
        return baseSlug;
    }
}

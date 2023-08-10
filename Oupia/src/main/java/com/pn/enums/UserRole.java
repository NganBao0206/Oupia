/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Enum.java to edit this template
 */
package com.pn.enums;

/**
 *
 * @author yuumm
 */
public enum UserRole {
    ADMIN("Administrator"),
    TENANT("Nguời thuê"),
    LANDLORD("Chủ trọ");
    
    
    private final String displayName;

    private UserRole(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
}

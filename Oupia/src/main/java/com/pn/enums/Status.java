/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Enum.java to edit this template
 */
package com.pn.enums;

/**
 *
 * @author yuu
 */
public enum Status {
    PENDING("Chờ duyệt"),
    ACCEPTED("Đã duyệt"),
    UNACCEPTED("Không duyệt");

    private final String displayName;

    private Status(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
}

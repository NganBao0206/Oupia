/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.pn.repository;

import com.pn.pojo.Motel;
import java.util.List;
import java.util.Map;

/**
 *
 * @author yuumm
 */
public interface MotelRepository {

    List<Motel> getMotels(Map<String, String> params, List<String> status);

    int countMotels(Map<String, String> params, List<String> status);

    boolean addOrUpdateMotel(Motel motel);

    Motel getMotelBySlug(String slug);

    boolean deleteMotel(String slug);

    boolean destroyMotel(String slug);

    boolean restoreMotel(String slug);

    List<String> findSlugsStartingWith(String slug);
}

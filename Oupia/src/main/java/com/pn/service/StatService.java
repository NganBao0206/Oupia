/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.pn.service;

import java.util.Date;
import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Service;

/**
 *
 * @author genji
 */
@Service
public interface StatService {

    Map<Integer, List<Object[]>> statUserByMonth(Map<String, String> params);

    Map<Integer, List<Object[]>> statUserByQuarter(Map<String, String> params);

    Map<Integer, List<Object[]>>  statUserByYear();

}

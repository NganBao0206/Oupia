/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.pn.service.impl;

import com.pn.repository.StatRepository;
import com.pn.service.StatService;
import java.util.Date;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author genji
 */
@Service
public class StatServiceImpl implements StatService {

    @Autowired
    private StatRepository statRepository;

    @Override
    public Map<Integer, List<Object[]>> statUserByMonth(Map<String, String> params) {
        return statRepository.statUserByMonth(params);
    }

    @Override
    public Map<Integer, List<Object[]>> statUserByQuarter(Map<String, String> params) {
        return statRepository.statUserByQuarter(params);
    }

    @Override
    public Map<Integer, List<Object[]>>  statUserByYear() {
        return statRepository.statUserByYear();
    }


}

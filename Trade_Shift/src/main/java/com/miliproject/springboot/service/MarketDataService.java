package com.miliproject.springboot.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.miliproject.springboot.entity.MarketData;
import com.miliproject.springboot.repository.MarketDataRepo;

import java.util.List;

@Service
public class MarketDataService {

    @Autowired
    private MarketDataRepo marketRepo;

    public List<MarketData> getAllMarketData() {
        return marketRepo.findAll();
    }

    public MarketData getMarketDataBySymbol(String symbol) {
        return marketRepo.findById(symbol).orElse(null);
    }
}

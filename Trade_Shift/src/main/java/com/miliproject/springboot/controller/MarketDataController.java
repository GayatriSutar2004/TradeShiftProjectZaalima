package com.miliproject.springboot.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.miliproject.springboot.entity.MarketData;
import com.miliproject.springboot.repository.MarketDataRepo;

import java.util.List;

@RestController
@RequestMapping("/api/market")
@CrossOrigin(origins = "http://localhost:3000")
public class MarketDataController {

    @Autowired
    private MarketDataRepo marketRepo;

    @GetMapping("/all")
    public List<MarketData> getAllMarketData() {
        return marketRepo.findAll();
    }

    @GetMapping("/{symbol}")
    public MarketData getMarketDataBySymbol(@PathVariable String symbol) {
        return marketRepo.findById(symbol).orElse(null);
    }
}

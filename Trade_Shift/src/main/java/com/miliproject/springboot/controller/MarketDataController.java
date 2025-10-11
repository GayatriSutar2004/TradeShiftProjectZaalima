package com.miliproject.springboot.controller;

// Import necessary classes
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.miliproject.springboot.entity.MarketData;
import com.miliproject.springboot.repository.MarketDataRepo;

import java.util.List;

@RestController // Marks this class as a REST API controller
@RequestMapping("/api/market") // All routes inside this controller will start with /api/market
@CrossOrigin(origins = "http://localhost:3000") // Allows requests from React frontend (running on localhost:3000)
public class MarketDataController {

    @Autowired // Automatically injects the MarketDataRepo dependency
    private MarketDataRepo marketRepo;

    // ✅ Endpoint to get all market data
    // Example: GET http://localhost:8080/api/market/all
    @GetMapping("/all")
    public List<MarketData> getAllMarketData() {
        // Fetches all MarketData records from the database
        return marketRepo.findAll();
    }

    // ✅ Endpoint to get market data by symbol
    // Example: GET http://localhost:8080/api/market/AAPL
    @GetMapping("/{symbol}")
    public MarketData getMarketDataBySymbol(@PathVariable String symbol) {
        // Finds the MarketData record by its symbol
        // Returns null if no record is found
        return marketRepo.findById(symbol).orElse(null);
    }
}

package com.miliproject.springboot.controller;

import com.miliproject.springboot.service.StockService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/stocks")
public class StockController {

    private final StockService stockService;

    public StockController(StockService stockService) {
        this.stockService = stockService;
    }

    @GetMapping("/search")
    public List<String> searchStocks(@RequestParam String query) {
        return stockService.searchStocks(query);
    }
}

package com.miliproject.springboot.controller;

import org.springframework.web.bind.annotation.*;
import com.miliproject.springboot.entity.Portfolio;
import com.miliproject.springboot.repository.PortfolioRepo;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

@RestController
@RequestMapping("/api/analytics")
@CrossOrigin(origins = "http://localhost:3000")
public class AnalyticsController {

    @Autowired
    private PortfolioRepo portfolioRepo;

    @GetMapping("/summary/{userId}")
    public double getTotalPortfolioValue(@PathVariable int userId) {
        List<Portfolio> portfolios = portfolioRepo.findByUserId(userId);
        double total = portfolios.stream()
                                 .mapToDouble(p -> p.getQuantity() * p.getCurrentPrice())
                                 .sum();
        return total;
    }
}

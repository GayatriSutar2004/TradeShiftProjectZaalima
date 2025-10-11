package com.miliproject.springboot.controller;

// Importing necessary dependencies
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.miliproject.springboot.entity.Portfolio;
import com.miliproject.springboot.repository.PortfolioRepo;

import java.util.List;

@RestController // Marks this class as a REST API controller
@RequestMapping("/api/portfolio") // All endpoints in this controller will start with /api/portfolio
@CrossOrigin(origins = "http://localhost:3000") // Allows API access from React frontend (localhost:3000)
public class PortfolioController {

    @Autowired // Automatically injects the PortfolioRepo dependency
    private PortfolioRepo portfolioRepo;

    // ✅ Endpoint to get all portfolio data for a specific user
    // Example: GET http://localhost:8080/api/portfolio/{userId}
    @GetMapping("/{userId}")
    public List<Portfolio> getUserPortfolio(@PathVariable int userId) {
        // Fetches and returns all portfolio records belonging to the given user ID
        return portfolioRepo.findByUserId(userId);
    }
}

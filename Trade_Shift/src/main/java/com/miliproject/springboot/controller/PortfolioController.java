package com.miliproject.springboot.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.miliproject.springboot.entity.Portfolio;
import com.miliproject.springboot.repository.PortfolioRepo;

import java.util.List;

@RestController
@RequestMapping("/api/portfolio")
@CrossOrigin(origins = "http://localhost:3000")
public class PortfolioController {

    @Autowired
    private PortfolioRepo portfolioRepo;

    @GetMapping("/{userId}")
    public List<Portfolio> getUserPortfolio(@PathVariable int userId) {
        return portfolioRepo.findByUserId(userId);
    }
}

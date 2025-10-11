package com.miliproject.springboot.controller;

import java.security.Principal;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.miliproject.springboot.service.PortfolioSummary;
import com.miliproject.springboot.service.TradeStats;

import com.miliproject.springboot.entity.User;

@RestController
@RequestMapping("/api/analytics")
public class AnalyticsController {

    private final AnalyticsService analyticsService;

    public AnalyticsController(AnalyticsService analyticsService) {
        this.analyticsService = analyticsService;
    }

    @GetMapping("/portfolio-summary")
    public PortfolioSummary getPortfolioSummary(Principal principal) {
        User user = getUserFromPrincipal(principal);
        return analyticsService.calculatePortfolioSummary(user);
    }

    @GetMapping("/trade-stats")
    public TradeStats getTradeStats(Principal principal) {
        User user = getUserFromPrincipal(principal);
        return analyticsService.calculateTradeStats(user);
    }

    private User getUserFromPrincipal(Principal principal){
        // JWT থেকে user fetch করা
        return new User(); // placeholder
    }
}

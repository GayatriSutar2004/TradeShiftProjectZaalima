package com.miliproject.springboot.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.miliproject.springboot.entity.Portfolio;
import com.miliproject.springboot.repository.PortfolioRepo;

import java.util.List;

@Service
public class PortfolioService {

    @Autowired
    private PortfolioRepo portfolioRepo;

    public List<Portfolio> getUserPortfolio(int userId) {
        return portfolioRepo.findByUserId(userId);
    }

    public Portfolio savePortfolio(Portfolio portfolio) {
        return portfolioRepo.save(portfolio);
    }
}

package com.miliproject.springboot.service;

import com.miliproject.springboot.entity.Portfolio;
import com.miliproject.springboot.entity.User;
import com.miliproject.springboot.repository.PortfolioRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PortfolioService {

    private final PortfolioRepository portfolioRepository;
    private final MarketDataService marketDataService;

    public PortfolioService(PortfolioRepository portfolioRepository, MarketDataService marketDataService) {
        this.portfolioRepository = portfolioRepository;
        this.marketDataService = marketDataService;
    }

    // ✅ Calculate total portfolio value
    public double calculatePortfolioValue(Long userId) {
        List<Portfolio> assets = portfolioRepository.findByUserId(userId);
        double totalValue = 0.0;

        for (Portfolio asset : assets) {
            double price = marketDataService.getStockPrice(asset.getSymbol());
            totalValue += price * asset.getQuantity();
        }
        return totalValue;
    }

    // ✅ Get all assets of a user
    public List<Portfolio> getUserPortfolio(Long userId) {
        return portfolioRepository.findByUserId(userId);
    }

    // ✅ Check if user has enough stocks to sell
    public boolean hasEnoughStocks(User user, String stockSymbol, int quantity) {
        Portfolio portfolio = portfolioRepository.findByUserIdAndSymbol(user.getId(), stockSymbol);

        if (portfolio == null) {
            return false; // user doesn't own this stock
        }
        return portfolio.getQuantity() >= quantity;
    }
}

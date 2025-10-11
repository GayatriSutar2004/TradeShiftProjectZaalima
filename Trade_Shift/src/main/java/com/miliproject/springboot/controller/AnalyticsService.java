package com.miliproject.springboot.controller;

import java.util.List;

import org.springframework.stereotype.Service;

import com.miliproject.springboot.entity.Order;
import com.miliproject.springboot.entity.Order.OrderType;
import com.miliproject.springboot.entity.Portfolio;
import com.miliproject.springboot.entity.User;
import com.miliproject.springboot.repository.OrderRepository;
import com.miliproject.springboot.repository.PortfolioRepository;
import com.miliproject.springboot.service.PortfolioSummary;
import com.miliproject.springboot.service.TradeStats;

@Service
public class AnalyticsService {

    private final OrderRepository orderRepository;
    private final PortfolioRepository portfolioRepository;

    public AnalyticsService(OrderRepository orderRepository, PortfolioRepository portfolioRepository) {
        this.orderRepository = orderRepository;
        this.portfolioRepository = portfolioRepository;
    }

    // Portfolio summary calculation
    public PortfolioSummary calculatePortfolioSummary(User user) {
        Portfolio portfolio = portfolioRepository.findByUser(user);
        if (portfolio == null) {
            throw new RuntimeException("Portfolio not found");
        }

        double totalInvested = portfolio.getHoldings().stream()
            .mapToDouble(h -> h.getQuantity() * h.getPrice())
            .sum();

        double balance = portfolio.getBalance();

        return new PortfolioSummary(totalInvested, balance);
    }

    // Trade statistics calculation
    public TradeStats calculateTradeStats(User user) {
        List<Order> orders = orderRepository.findByUserId(user.getId());
        long totalBuy = orders.stream().filter(o -> o.getType() == OrderType.BUY).count();
        long totalSell = orders.stream().filter(o -> o.getType() == OrderType.SELL).count();
        return new TradeStats(totalBuy, totalSell);
    }
}

package com.miliproject.springboot.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.miliproject.springboot.entity.Order;
import com.miliproject.springboot.entity.User;
import com.miliproject.springboot.repository.OrderRepository;


 @Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final PortfolioService portfolioService; // ধরে নাও আছে
    private final UserService userService; // ধরে নাও আছে

    public OrderService(OrderRepository orderRepository, PortfolioService portfolioService, UserService userService) {
        this.orderRepository = orderRepository;
        this.portfolioService = portfolioService;
        this.userService = userService;
    }

    // ✅ Place order
    public Order placeOrder(Order order) {
        // Validation
        if (order.getType() == Order.OrderType.BUY) {
            if (!userService.hasEnoughBalance(order.getUser(), order.getPrice() * order.getQuantity())) {
                throw new RuntimeException("Not enough balance");
            }
        } else if (order.getType() == Order.OrderType.SELL) {
            if (!portfolioService.hasEnoughStocks(order.getUser(), order.getStockSymbol(), order.getQuantity())) {
                throw new RuntimeException("Not enough stocks to sell");
            }
        }

        order.setCreatedAt(LocalDateTime.now());
        return orderRepository.save(order);
    }

    // ✅ Get history
    public List<Order> getOrderHistory(User user) {
        return orderRepository.findByUserId(user.getId());
    }

    // ✅ Get by ID
    public Order getOrderById(Long id) {
        return orderRepository.findById(id).orElseThrow(() -> new RuntimeException("Order not found"));
    }

    // ✅ Cancel order
    public Order cancelOrder(Long id) {
        Order order = getOrderById(id);
        // শুধু pending order cancel করবে
        order.setStatus("CANCELLED");
        return orderRepository.save(order);
    }

	public jakarta.persistence.criteria.Order placeOrder1(Order order) {
		// TODO Auto-generated method stub
		return null;
	}
}

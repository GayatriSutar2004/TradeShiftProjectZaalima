package com.miliproject.springboot.controller;

import com.miliproject.springboot.entity.Orders;
import com.miliproject.springboot.repository.OrdersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/orders")
@CrossOrigin(origins = "http://localhost:3000")
public class OrdersController {

    @Autowired
    private OrdersRepository ordersRepository;

    @PostMapping
    public Orders placeOrder(@RequestBody Orders order) {
        order.setDate(LocalDateTime.now());
        return ordersRepository.save(order);
    }

    @GetMapping
    public List<Orders> getOrders() {
        return ordersRepository.findAll();
    }
}
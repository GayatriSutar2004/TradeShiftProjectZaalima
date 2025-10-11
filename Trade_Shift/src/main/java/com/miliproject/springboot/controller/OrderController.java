package com.miliproject.springboot.controller;

// Importing necessary classes and packages
import com.miliproject.springboot.entity.Orders;
import com.miliproject.springboot.repository.OrdersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController // Marks this class as a RESTful API controller
@RequestMapping("/orders") // All endpoints in this controller will start with /orders
@CrossOrigin(origins = "http://localhost:3000") // Allows requests from React frontend running on localhost:3000
public class OrdersController {

    @Autowired // Automatically injects the OrdersRepository dependency
    private OrdersRepository ordersRepository;

    // ✅ Endpoint to place (create) a new order
    // Example: POST http://localhost:8080/orders
    // The order data should be sent in the request body as JSON
    @PostMapping
    public Orders placeOrder(@RequestBody Orders order) {
        // Automatically set the current date and time for the order
        order.setDate(LocalDateTime.now());
        // Save the order to the database and return the saved object
        return ordersRepository.save(order);
    }

    // ✅ Endpoint to get all orders from the database
    // Example: GET http://localhost:8080/orders
    @GetMapping
    public List<Orders> getOrders() {
        // Retrieve and return all orders stored in the database
        return ordersRepository.findAll();
    }
}

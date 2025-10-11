package com.miliproject.springboot.controller;

// Importing necessary classes and packages
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.miliproject.springboot.entity.User;
import com.miliproject.springboot.repository.UserRepo;
import com.miliproject.springboot.service.UserService;

import java.util.List;

@RestController // Marks this class as a REST API controller
@RequestMapping("/api/users") // All endpoints in this controller will start with /api/users
@CrossOrigin(origins = "http://localhost:3000") // Allows requests from React frontend (running on localhost:3000)
public class UserController {

    @Autowired // Injects UserService automatically
    private UserService userService;

    @Autowired // Injects UserRepo automatically
    private UserRepo userRepo;

    // ✅ Endpoint to register a new user
    // Example: POST http://localhost:8080/api/users/register
    // Request body should contain user details in JSON format
    @PostMapping("/register")
    public User registerUser(@RequestBody User user) {
        // Calls UserService to save the new user to the database
        return userService.saveUser(user);
    }

    // ✅ Endpoint to get all registered users
    // Example: GET http://localhost:8080/api/users/all
    @GetMapping("/all")
    public List<User> getAllUsers() {
        // Fetches and returns all user records from the database
        return userRepo.findAll();
    }

    // ✅ Endpoint to get user details by email
    // Example: GET http://localhost:8080/api/users/john@example.com
    @GetMapping("/{email}")
    public User getUserByEmail(@PathVariable String email) {
        // Finds and returns a user by their email
        // Returns null if the email does not exist in the database
        return userRepo.findByEmail(email);
    }
}

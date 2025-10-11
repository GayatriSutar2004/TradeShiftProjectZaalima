package com.miliproject.springboot.entity;

import jakarta.persistence.*;
import java.sql.Date;

@Entity
public class TransactionHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;  // Unique ID for each transaction

    private int userId;  // ID of the user who made the transaction
    private Date date;   // Date of the transaction
    private String type; // Transaction type: "Buy" or "Sell"
    private String symbol; // Stock or asset symbol
    private int quantity;  // Number of units bought or sold
    private double price;  // Price per unit

    // Getters and Setters

    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public int getUserId() { return userId; }
    public void setUserId(int userId) { this.userId = userId; }

    public Date getDate() { return date; }
    public void setDate(Date date) { this.date = date; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public String getSymbol() { return symbol; }
    public void setSymbol(String symbol) { this.symbol = symbol; }

    public int getQuantity() { return quantity; }
    public void setQuantity(int quantity) { this.quantity = quantity; }

    public double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }
}

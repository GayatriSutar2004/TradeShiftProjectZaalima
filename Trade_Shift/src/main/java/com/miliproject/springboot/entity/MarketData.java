package com.miliproject.springboot.entity;

import jakarta.persistence.*;

@Entity
public class MarketData {

    @Id
    private String symbol;

    private String name;
    private double currentPrice;

    @Column(name = "price_change")  // Avoid using reserved keyword "change"
    private double change;

    // Getters and setters
    public String getSymbol() { return symbol; }
    public void setSymbol(String symbol) { this.symbol = symbol; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public double getCurrentPrice() { return currentPrice; }
    public void setCurrentPrice(double currentPrice) { this.currentPrice = currentPrice; }

    public double getChange() { return change; }
    public void setChange(double change) { this.change = change; }
}

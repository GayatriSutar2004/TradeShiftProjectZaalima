package com.miliproject.springboot.entity;

import jakarta.persistence.*;

@Entity // Marks this class as a JPA entity mapped to a database table
public class MarketData {

    @Id // Specifies that 'symbol' is the primary key of this entity
    private String symbol; // Unique stock symbol (e.g., AAPL, GOOGL, etc.)

    private String name; // Full company or market name
    private double currentPrice; // Current market price of the stock

    @Column(name = "price_change") // Custom column name to avoid using SQL reserved keyword "change"
    private double change; // Price change value (difference from previous close)

    // ✅ Getters and Setters — used for accessing and updating private fields
    public String getSymbol() { 
        return symbol; 
    }

    public void setSymbol(String symbol) { 
        this.symbol = symbol; 
    }

    public String getName() { 
        return name; 
    }

    public void setName(String name) { 
        this.name = name; 
    }

    public double getCurrentPrice() { 
        return currentPrice; 
    }

    public void setCurrentPrice(double currentPrice) { 
        this.currentPrice = currentPrice; 
    }

    public double getChange() { 
        return change; 
    }

    public void setChange(double change) { 
        this.change = change; 
    }
}

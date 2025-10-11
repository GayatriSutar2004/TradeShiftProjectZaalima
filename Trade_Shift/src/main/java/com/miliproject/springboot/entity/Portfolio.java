package com.miliproject.springboot.entity;

import jakarta.persistence.*;

@Entity // Marks this class as a JPA entity (maps to a database table)
public class Portfolio {

    @Id // Marks 'id' as the primary key for this entity
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    // Automatically generates a unique ID for each portfolio entry (auto-incremented by the database)
    private int id;

    private int userId;        // The ID of the user who owns this portfolio
    private String symbol;     // The stock symbol (e.g., AAPL, MSFT)
    private String name;       // Full company or asset name
    private int quantity;      // Number of shares or units owned
    private double currentPrice; // Current price per unit of the stock
    private double totalValue;   // Total value = quantity × currentPrice

    // ✅ Getters and Setters — used to access and modify private fields safely

    public int getId() { 
        return id; 
    }
    public void setId(int id) { 
        this.id = id; 
    }

    public int getUserId() { 
        return userId; 
    }
    public void setUserId(int userId) { 
        this.userId = userId; 
    }

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

    public int getQuantity() { 
        return quantity; 
    }
    public void setQuantity(int quantity) { 
        this.quantity = quantity; 
    }

    public double getCurrentPrice() { 
        return currentPrice; 
    }
    public void setCurrentPrice(double currentPrice) { 
        this.currentPrice = currentPrice; 
    }

    public double getTotalValue() { 
        return totalValue; 
    }
    public void setTotalValue(double totalValue) { 
        this.totalValue = totalValue; 
    }
}

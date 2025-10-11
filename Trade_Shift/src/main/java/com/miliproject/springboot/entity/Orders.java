package com.miliproject.springboot.entity;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity // Marks this class as a JPA entity (maps to a database table)
public class Orders {

    @Id // Marks this field as the primary key
    @GeneratedValue(strategy = GenerationType.IDENTITY) 
    // Auto-generates a unique ID for each order (auto-incremented by the database)
    private Long id;

    private String symbol; // The stock symbol (e.g., AAPL, GOOGL)
    private String type;   // The type of order - "Buy" or "Sell"
    private int quantity;  // Number of stock units ordered
    private double price;  // Price per unit at the time of the order
    private LocalDateTime date; // Timestamp when the order was placed

    // ✅ Getters and Setters — provide controlled access to private fields

    public Long getId() { 
        return id; 
    }
    public void setId(Long id) { 
        this.id = id; 
    }

    public String getSymbol() { 
        return symbol; 
    }
    public void setSymbol(String symbol) { 
        this.symbol = symbol; 
    }

    public String getType() { 
        return type; 
    }
    public void setType(String type) { 
        this.type = type; 
    }

    public int getQuantity() { 
        return quantity; 
    }
    public void setQuantity(int quantity) { 
        this.quantity = quantity; 
    }

    public double getPrice() { 
        return price; 
    }
    public void setPrice(double price) { 
        this.price = price; 
    }

    public LocalDateTime getDate() { 
        return date; 
    }
    public void setDate(LocalDateTime date) { 
        this.date = date; 
    }
}

package com.miliproject.springboot.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.miliproject.springboot.entity.MarketData;

import java.util.List;

@Repository
public interface MarketDataRepo extends JpaRepository<MarketData, String> {

    // Find all MarketData entries where the name contains the given keyword (case-insensitive)
    List<MarketData> findByNameContainingIgnoreCase(String keyword);

    // Find all MarketData entries where the current price is greater than the given value
    List<MarketData> findByCurrentPriceGreaterThan(double price);

    // Find all MarketData entries where the current price is less than the given value
    List<MarketData> findByCurrentPriceLessThan(double price);
}

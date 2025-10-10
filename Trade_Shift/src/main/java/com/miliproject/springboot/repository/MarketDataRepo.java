package com.miliproject.springboot.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.miliproject.springboot.entity.MarketData;

import java.util.List;

@Repository
public interface MarketDataRepo extends JpaRepository<MarketData, String> {

    // Find stocks by name containing a keyword
    List<MarketData> findByNameContainingIgnoreCase(String keyword);

    // Find stocks with price greater than a value
    List<MarketData> findByCurrentPriceGreaterThan(double price);

    // Find stocks with price less than a value
    List<MarketData> findByCurrentPriceLessThan(double price);
}

package com.miliproject.springboot.repository;

import com.miliproject.springboot.entity.Portfolio;
import com.miliproject.springboot.entity.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PortfolioRepository extends JpaRepository<Portfolio, Long> {

    // Find all portfolio entries for a user
    List<Portfolio> findByUserId(Long userId);

    // Find specific stock holding for a user (used in hasEnoughStocks)
    

	

    Portfolio findByUserIdAndSymbol(int id, String stockSymbol);

    Portfolio findByUser(User user);
}

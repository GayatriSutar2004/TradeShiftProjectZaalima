package com.miliproject.springboot.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.miliproject.springboot.entity.Portfolio;
import java.util.List;

@Repository
public interface PortfolioRepo extends JpaRepository<Portfolio, Integer> {

    List<Portfolio> findByUserId(int userId);

    Portfolio findByUserIdAndSymbol(int userId, String symbol);

    void deleteByUserIdAndSymbol(int userId, String symbol);
}

package com.miliproject.springboot.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.miliproject.springboot.entity.TransactionHistory;
import java.util.List;

@Repository
public interface TransactionHistoryRepo extends JpaRepository<TransactionHistory, Integer> {

    List<TransactionHistory> findByUserId(int userId);

}

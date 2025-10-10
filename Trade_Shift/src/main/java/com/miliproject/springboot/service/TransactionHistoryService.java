package com.miliproject.springboot.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.miliproject.springboot.entity.TransactionHistory;
import com.miliproject.springboot.repository.TransactionHistoryRepo;

import java.util.List;

@Service
public class TransactionHistoryService {

    @Autowired
    private TransactionHistoryRepo transactionRepo;

    public TransactionHistory saveTransaction(TransactionHistory transaction) {
        return transactionRepo.save(transaction);
    }

    public List<TransactionHistory> getUserTransactions(int userId) {
        return transactionRepo.findByUserId(userId);
    }
}

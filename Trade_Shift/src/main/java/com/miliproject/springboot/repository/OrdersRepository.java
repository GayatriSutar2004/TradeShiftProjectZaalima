package com.miliproject.springboot.repository;

import com.miliproject.springboot.entity.Orders;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrdersRepository extends JpaRepository<Orders, Long> {}
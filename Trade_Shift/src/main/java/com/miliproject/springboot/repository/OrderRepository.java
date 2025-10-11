package com.miliproject.springboot.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.miliproject.springboot.entity.Order;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByUserId(Long userId);

	Order save(jakarta.persistence.criteria.Order order);

	List<Order> findByUserId(int id);
}

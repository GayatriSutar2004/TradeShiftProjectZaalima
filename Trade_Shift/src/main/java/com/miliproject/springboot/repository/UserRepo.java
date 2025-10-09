package com.miliproject.springboot.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.miliproject.springboot.entity.User;

public interface UserRepo extends JpaRepository<User, Long> {
    User findByEmail(String username);
    // custom query methods here
}

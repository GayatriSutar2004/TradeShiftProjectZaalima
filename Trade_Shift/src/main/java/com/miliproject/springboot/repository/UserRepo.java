package com.miliproject.springboot.repository;

import org.springframework.data.jpa.repository.JpaRepository;
<<<<<<< HEAD

import com.miliproject.springboot.entity.User;

public interface UserRepo extends JpaRepository<User, Integer> {

	public User findByEmail(String emaill);

}
=======
import com.miliproject.springboot.entity.User;

public interface UserRepo extends JpaRepository<User, Long> {
    User findByEmail(String username);
    // custom query methods here
}
>>>>>>> origin/master

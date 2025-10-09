package com.miliproject.springboot.service;




	import com.miliproject.springboot.entity.User;

	public interface UserService {

		public User saveUser(User user);

		public void removeSessionMessage();

	}


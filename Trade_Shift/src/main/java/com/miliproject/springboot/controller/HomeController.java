package com.miliproject.springboot.controller;

	import java.security.Principal;

	import org.springframework.beans.factory.annotation.Autowired;
	import org.springframework.stereotype.Controller;
	import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
	import org.springframework.web.bind.annotation.ModelAttribute;
	import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.miliproject.springboot.entity.User;
	import com.miliproject.springboot.repository.UserRepo;
	import com.miliproject.springboot.service.UserService;
	import com.fasterxml.jackson.annotation.JsonCreator.Mode;

	import jakarta.servlet.http.HttpSession;

	@RestController
	@RequestMapping("/api/users")
	@CrossOrigin(origins = "http://localhost:3000")
	@Controller
	public class HomeController {

		@Autowired
		private UserService userService;

		@Autowired
		private UserRepo userRepo;

		@ModelAttribute
		public void commonUser(Principal p, Model m) {
			if (p != null) {
				String email = p.getName();
				User user = userRepo.findByEmail(email);
				m.addAttribute("user", user);
			}

		}

		@GetMapping("/")
		public String index() {
			return "index";
		}

		@GetMapping("/register")
		public String register() {
			return "register";
		}

		@GetMapping("/signin")
		public String login() {
			return "login";
		}

		@GetMapping("/user/profile")
		public String profile(Principal p, Model m) {
			String email = p.getName();
			User user = userRepo.findByEmail(email);
			m.addAttribute("user", user);
			return "profile";
		}

		@GetMapping("/user/home")
		public String home() {
			return "home";
		}

		@PostMapping("/saveUser")
		public String saveUser(@ModelAttribute User user, HttpSession session, Model m) {

			// System.out.println(user);

			User u = userService.saveUser(user);

			if (u != null) {
				// System.out.println("save sucess");
				session.setAttribute("msg", "Register successfully");

			} else {
				// System.out.println("error in server");
				session.setAttribute("msg", "Something wrong server");
			}
			return "redirect:/register";
		}

	}
	

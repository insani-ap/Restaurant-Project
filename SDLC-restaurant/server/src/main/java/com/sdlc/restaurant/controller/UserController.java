package com.sdlc.restaurant.controller;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import com.sdlc.restaurant.service.MailServ;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import com.sdlc.restaurant.entity.User;
import com.sdlc.restaurant.notfoundexception.UserNotFoundException;
import com.sdlc.restaurant.repository.UserRepository;

@RestController
@CrossOrigin("http://localhost:3000")
public class UserController {

	@Autowired
	private UserRepository userRepository;
	@Autowired
	private MailServ mail;

	@GetMapping("/user")
	public List<User> retrieveAllUser() {
		return userRepository.findByRole("User");
	}

	@GetMapping("/admin")
	public List<User> retrieveAllAdmin() {
		return userRepository.findByRole("Admin");
	}

	@GetMapping("/user/{id}")
	public User retrieveUser(@PathVariable long id) {
		Optional<User> user = userRepository.findById(id);

		if (!user.isPresent())
			throw new UserNotFoundException("id-" + id);

		return user.get();
	}

	@GetMapping("/user/email/{email}")
	public User retrieveUserEmail(@PathVariable String email) {
		return userRepository.findByEmail(email);
	}

	@GetMapping("/user/uname/{username}")
	public ResponseEntity<String> retrieveUserUsername(@PathVariable String username) {
		User user = userRepository.findByUsernameAndRole(username, "User");
		if (user != null) {
			JSONObject jsonObject = new JSONObject();
			jsonObject.put("id", user.getId());
			jsonObject.put("name", user.getName());
			jsonObject.put("email", user.getEmail());
			jsonObject.put("password", user.getPassword());
			jsonObject.put("role", user.getRole());
			jsonObject.put("token", generateJwtToken(user.getPassword()));
			return new ResponseEntity<String>(jsonObject.toString(), HttpStatus.OK);
		} else {
			return null;
		}
	}

	@GetMapping("/admin/uname/{username}")
	public ResponseEntity<String> retrieveAdminUsername(@PathVariable String username) {
		User user = userRepository.findByUsernameAndRole(username, "Admin");
		if (user != null) {
			JSONObject jsonObject = new JSONObject();
			jsonObject.put("id", user.getId());
			jsonObject.put("name", user.getName());
			jsonObject.put("email", user.getEmail());
			jsonObject.put("password", user.getPassword());
			jsonObject.put("role", user.getRole());
			jsonObject.put("token", generateJwtToken(user.getPassword()));
			return new ResponseEntity<String>(jsonObject.toString(), HttpStatus.OK);
		} else {
			return null;
		}
	}

	@DeleteMapping("/user/delete/{id}")
	public void deleteUser(@PathVariable long id) {
		userRepository.deleteById(id);
	}

	@PostMapping(value = "/user/add", consumes = "application/json")
	public void createUser(@RequestBody User user) {
		String title = "Registration";
		String msg = "Thankyou " + user.getName() + " for registering to Nexsoft Restaurant.";
		mail.sendMessage(user.getEmail(), title, msg);
		userRepository.save(user);
	}

	@PutMapping("/user/update/{id}")
	public ResponseEntity<Object> updateUser(@RequestBody User user, @PathVariable long id) {

		Optional<User> userOptional = userRepository.findById(id);

		if (!userOptional.isPresent())
			return ResponseEntity.notFound().build();

		user.setId(id);

		userRepository.save(user);

		return ResponseEntity.noContent().build();
	}

	private String generateJwtToken(String username) {
		String token = Jwts.builder().setSubject(username).setIssuer("teamcbatch5@gmail.com")
				.claim("groups", new String[] { "user", "admin" }).signWith(SignatureAlgorithm.HS512, "MTIzNDU2Nzg=")
				.compact();
		return token;
	}
}
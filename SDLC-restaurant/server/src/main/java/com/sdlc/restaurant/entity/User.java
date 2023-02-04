package com.sdlc.restaurant.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column
	private Long id;

	@Column(name = "email", unique = true)
	private String email;

	@Column(name = "password")
	private String password;

	@Column(name = "username", unique = true)
	private String username;

	@Column(name = "name")
	private String name;

	@Column(name = "phonenumber", unique = true)
	private String phoneNumber;

	@Column(name = "role")
	private String role;

	public User(Long id, String email, String password, String phoneNumber, String username, String name, String role) {
		super();
		this.id = id;
		this.email = email;
		this.password = password;
		this.username = username;
		this.phoneNumber = phoneNumber;
		this.name = name;
		this.role = role;
	}

	public User() {
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public String getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

}

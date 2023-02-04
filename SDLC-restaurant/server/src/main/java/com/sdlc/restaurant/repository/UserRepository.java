package com.sdlc.restaurant.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

import com.sdlc.restaurant.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
	public User findByEmail(String email);

	public User findByUsernameAndRole(String username, String role);

	public List<User> findByRole(String role);

	public User findByIdAndName(long id, String name);
}

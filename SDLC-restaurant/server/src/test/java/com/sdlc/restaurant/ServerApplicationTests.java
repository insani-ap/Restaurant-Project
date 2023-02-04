package com.sdlc.restaurant;

import java.util.List;

import com.sdlc.restaurant.controller.UserController;
import com.sdlc.restaurant.entity.User;
import org.junit.Assert;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class ServerApplicationTests {

	@Autowired
	UserController userCont;

	User user1 = new User(99l, "dummy@gmail.com", "password", "username", "name", "User", "203910231");
	User admin1 = new User(99l, "admin@gmail.com", "password", "username2", "name", "Admin", "102930123");

	// @Test
	// void addAdminData() {
	// String expected = admin1.getEmail();
	// userCont.createUser(admin1);
	// User found = userCont.retrieveUserEmail(admin1.getEmail());
	// String actual = found.getEmail();
	// Assert.assertEquals(expected, actual);
	// }

	// @Test
	// void addUserData() {
	// String expected = user1.getEmail();
	// userCont.createUser(user1);
	// User found = userCont.retrieveUserEmail(user1.getEmail());
	// String actual = found.getEmail();
	// Assert.assertEquals(expected, actual);
	// }

	@Test
	void listUser() {
		Assert.assertTrue(userCont.retrieveAllUser().size() != 0);
	}

	void listAdmin() {
		Assert.assertTrue(userCont.retrieveAllAdmin().size() != 0);
	}

	@Test
	void findByEmailUser() {

		String expected = user1.getEmail();
		User found = userCont.retrieveUserEmail(user1.getEmail());
		String actual = found.getEmail();

		// Assert.assertEquals(user1.getEmail(), found.getEmail());
		Assert.assertEquals(expected, actual);
	}

}

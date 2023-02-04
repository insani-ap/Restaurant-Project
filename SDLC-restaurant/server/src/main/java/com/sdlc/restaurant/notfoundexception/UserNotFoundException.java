package com.sdlc.restaurant.notfoundexception;

public class UserNotFoundException extends RuntimeException {

	public UserNotFoundException(String exception) {
		super(exception);
	}

}

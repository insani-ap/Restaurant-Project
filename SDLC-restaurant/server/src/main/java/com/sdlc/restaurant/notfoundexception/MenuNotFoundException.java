package com.sdlc.restaurant.notfoundexception;

public class MenuNotFoundException extends RuntimeException {

	public MenuNotFoundException(String exception) {
		super(exception);
	}

}

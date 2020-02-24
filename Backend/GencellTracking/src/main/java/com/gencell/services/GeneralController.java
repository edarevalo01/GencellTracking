package com.gencell.services;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class GeneralController {
	
	@RequestMapping("/")
	public String emptyPath() {
		return "Hello World xd";
	}

}

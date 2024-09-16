package com.codideep.app.business.general;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("")
public class IndexController {
	@GetMapping("")
	public ResponseEntity<SoIndexGet> actionIndexGet() {
		SoIndexGet soIndexGet = new SoIndexGet();

		soIndexGet.setMessage("Bienvenido(a) a tu primera aplicación con Spring Boot.");
		soIndexGet.setType("success");

		return new ResponseEntity<>(soIndexGet, HttpStatus.OK);
	}
}
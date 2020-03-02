package com.gencell.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.gencell.entities.VWTrackingPersonas;
import com.gencell.repositories.GeneralRepo;

import gencell.authenticationservice.UsuarioGencell;

@RestController
public class GeneralController {
	
	@Autowired
	private GeneralRepo genRepo;

	@RequestMapping("/")
	public String emptyPath() {
		return "Hello World xd";
	}

	@RequestMapping("/login")
	public String login(@RequestParam String usuario, @RequestParam String clave) {
		AutenticacionController aut = new AutenticacionController();

		UsuarioGencell user = aut.AutenticarTest(usuario);

		if (user != null && user.getRetorno() != null && "SUCCESS".equals(user.getRetorno().getMsg())) {
			String token = aut.generarTokenByUsuario(usuario);
			return "{ \"status\": \"ok\", \"message\": \"" + token + "\"}";
		} else {
			return "{ \"status\": \"fail\", \"message\": \"Ingreso incorrecto.\"}";
		}
	}
	
	@RequestMapping("/hola")
	public Iterable<VWTrackingPersonas> hola() {
		return genRepo.findAll();
	}
	
	

}

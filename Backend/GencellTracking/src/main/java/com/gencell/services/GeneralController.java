package com.gencell.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.gencell.dto.Response;
import com.gencell.entities.VWTrackingEstadoPeticiones;
import com.gencell.entities.VWTrackingPersonas;
import com.gencell.repositories.TrackingEstadoPeticiones;
import com.gencell.repositories.TrackingPersonas;

import gencell.authenticationservice.UsuarioGencell;

@RestController
public class GeneralController {

	@Autowired
	private TrackingPersonas personas;
	
	@Autowired
	private TrackingEstadoPeticiones estadoPeticiones;

	@RequestMapping(path = "/")
	public String emptyPath() {
		return "Welcome";
	}

	@RequestMapping(path = "/login", method = RequestMethod.POST)
	public Response login(@RequestParam String usuario, @RequestParam String clave) {
		AutenticacionController aut = new AutenticacionController();
		UsuarioGencell user = aut.AutenticarTest(usuario); 
		//UsuarioGencell user = aut.autenticarGencellPharma(usuario, clave);

		if (user != null && user.getRetorno() != null && "SUCCESS".equals(user.getRetorno().getMsg())) {
			String token = aut.generarTokenByUsuario(usuario);
			return new Response(Response.OK, token);
		} 
		else {
			return new Response(Response.FAIL, "Usuario o contraseña incorrectos");
		}
	}

	@CrossOrigin
	@RequestMapping(path = "/getAllPersonas", method = RequestMethod.GET)
	public Response getAllUsers() {
		Iterable<VWTrackingPersonas> personasIterable = personas.findAll();
		return new Response(Response.OK, personasIterable);
	}
	
	@CrossOrigin
	@RequestMapping(path = "/getAllEstados", method = RequestMethod.GET)
	public Response getAllEstados() {
		Iterable<VWTrackingEstadoPeticiones> estadosIterable = estadoPeticiones.findAll();
		return new Response(Response.OK, estadosIterable);
	}
	
	@CrossOrigin
	@RequestMapping(path = "/getEstadosByIdPaciente")
	public Iterable<VWTrackingEstadoPeticiones> getEstadosByIdPaciente(@RequestParam String idPaciente) {
		return estadoPeticiones.findAllByIdPaciente(idPaciente);
	}
	
	@RequestMapping(path = "/getEstadosByIdPeticion")
	public Iterable<VWTrackingEstadoPeticiones> getEstadosByIdPeticion(@RequestParam String idPeticion) {
//		System.out.println(estadoPeticiones.findAllByIdPeticion(idPeticion).);
		return estadoPeticiones.findAllByIdPeticion(idPeticion);
	}

}

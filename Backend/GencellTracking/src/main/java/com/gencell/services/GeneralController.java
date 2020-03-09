package com.gencell.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.gencell.dto.Response;
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
	
	@RequestMapping(path = "/getPersonaByUsuario", method = RequestMethod.GET)
	public Response getPersonaByUsuario(@RequestParam String usuario) {
		try {
			Optional<VWTrackingPersonas> optPer = personas.findByUsuario(usuario);
			if(!optPer.isPresent()) return new Response(Response.FAIL, "El usuario no existe");
			return new Response(Response.OK, optPer.get());
		} catch (Exception e) {
			return new Response(Response.FAIL, e);
		}
	}
	
	@RequestMapping(path = "/getPersonaById", method = RequestMethod.GET)
	public Response getPersonaById(@RequestParam String idPersona) {
		try {
			Optional<VWTrackingPersonas> optPer = personas.findByIdPaciente(idPersona);
			if(!optPer.isPresent()) return new Response(Response.FAIL, "El usuario no existe");
			return new Response(Response.OK, optPer.get());
		} catch (Exception e) {
			return new Response(Response.FAIL, e);
		}
	}
	
	@RequestMapping(path = "/getPersonasByCliente", method = RequestMethod.GET)
	public Response getPersonasByCliente(@RequestParam String idCliente) {
		try {
			return new Response(Response.OK, personas.findAllByIdCliente(idCliente));
		} catch (Exception e) {
			return new Response(Response.FAIL, e);
		}
	}

	@RequestMapping(path = "/getEstadosByPaciente", method = RequestMethod.GET)
	public Response getEstadosByPaciente(@RequestParam String idPaciente) {
		try {
			return new Response(Response.OK, estadoPeticiones.findAllByIdPaciente(idPaciente));
		} catch (Exception e) {
			return new Response(Response.FAIL, e);
		}
	}
	
	@RequestMapping(path = "/getEstadosByCliente", method = RequestMethod.GET)
	public Response getEstadosByCliente(@RequestParam String idCliente) {
		try {
			return new Response(Response.OK, estadoPeticiones.findAllByIdCliente(idCliente));
		} catch (Exception e) {
			return new Response(Response.FAIL, e);
		}
	}
	
	@RequestMapping(path = "/getEstadosByPeticion", method = RequestMethod.GET)
	public Response getEstadosByPeticion(@RequestParam String idPeticion) {
		try {
			return new Response(Response.OK, estadoPeticiones.findAllByIdPeticion(idPeticion));
		} catch (Exception e) {
			return new Response(Response.FAIL, e);
		}
	}

}

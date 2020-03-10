package com.gencell.services;

import java.util.ArrayList;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.TreeMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.gencell.dto.Estados;
import com.gencell.dto.Examen;
import com.gencell.dto.Response;
import com.gencell.entities.VWTrackingEstadoPeticiones;
import com.gencell.entities.VWTrackingPersonas;
import com.gencell.repositories.TrackingEstadoPeticiones;
import com.gencell.repositories.TrackingPersonas;

import gencell.authenticationservice.UsuarioGencell;

@RestController
@CrossOrigin
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
		System.out.println(user.getRetorno().getMsg());
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
			Iterable<VWTrackingEstadoPeticiones> estadosCompletos = estadoPeticiones.findAllByIdPaciente(idPaciente);
			Map<String, ArrayList<Examen>> map = new TreeMap<>();
			for(VWTrackingEstadoPeticiones tep: estadosCompletos) {
				if(map.containsKey(tep.getIdPeticion())) {
					ArrayList<Examen> examenes = map.get(tep.getIdPeticion());
					Examen e = new Examen(
							tep.getIdPaciente(), 
							tep.getIdCliente(), 
							tep.getIdEstado(), 
							tep.getActivo(), 
							tep.getDescripcion(), 
							tep.getFechaCreacion(), 
							tep.getDiagnostico(), 
							tep.getObservaciones());
					examenes.add(e);
					map.put(tep.getIdPeticion(), examenes);
				}
				else {
					ArrayList<Examen> examenes = new ArrayList<>();
					Examen e = new Examen(
							tep.getIdPaciente(), 
							tep.getIdCliente(), 
							tep.getIdEstado(), 
							tep.getActivo(), 
							tep.getDescripcion(), 
							tep.getFechaCreacion(), 
							tep.getDiagnostico(), 
							tep.getObservaciones());
					examenes.add(e);
					map.put(tep.getIdPeticion(), examenes);
				}
			}
			Set<String> keys = map.keySet();
			ArrayList<Estados> estados = new ArrayList<>();
			for(String key: keys) {
				 Estados estado = new Estados(key, map.get(key));
				 estados.add(estado);
			}
			return new Response(Response.OK, estados);
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

package com.gencell.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.TreeMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.gencell.dto.Estados;
import com.gencell.dto.Examen;
import com.gencell.dto.Response;
import com.gencell.dto.Usuario;
import com.gencell.entities.Personas;
import com.gencell.entities.UsuarioRolesAplicacion;
import com.gencell.entities.Usuarios;
import com.gencell.entities.VWTrackingEstadoPeticiones;
import com.gencell.entities.VWTrackingPersonas;
import com.gencell.repositories.PersonasRepository;
import com.gencell.repositories.TrackingEstadoPeticionesRepository;
import com.gencell.repositories.TrackingPersonasRepository;
import com.gencell.repositories.UsuarioRolesAplicacionRepository;
import com.gencell.repositories.UsuariosRepository;

import gencell.authenticationservice.UsuarioGencell;

@RestController
@CrossOrigin
public class GeneralController {

	@Autowired
	private TrackingPersonasRepository trackingPersonas;
	
	@Autowired
	private TrackingEstadoPeticionesRepository estadoPeticiones;
	
	@Autowired
	private PersonasRepository personas;
	
	@Autowired
	private UsuariosRepository usuarios;
	
	@Autowired
	private UsuarioRolesAplicacionRepository usuarioRoles;

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
	
	@RequestMapping(path = "/getUsuarioByUsuario", method = RequestMethod.GET)
	public Response getUsuarioByUsuario(@RequestParam String usuario) {
		try {
			List<Usuarios> listUser = usuarios.findByUsuario(usuario);
			if(listUser.size() == 0) return new Response(Response.FAIL, "El usuario no existe");
			return new Response(Response.OK, listUser.get(0));
		} catch (Exception e) {
			return new Response(Response.FAIL, e);
		}
	}
	
	@RequestMapping(path = "/getTipoDocumentoById", method = RequestMethod.GET)
	public Response getTipoDocumentoById(@RequestParam String id) {
		try {
			List<Personas> listPersonas = personas.findById(id);
			if(listPersonas.size() == 0) return new Response(Response.FAIL, "El usuario no existe");
			return new Response(Response.OK, listPersonas.get(0).getIdTipoDocumento());
		} catch (Exception e) {
			return new Response(Response.FAIL, e);
		}
	}
	
	@RequestMapping(path = "/getPersonaByUsuario", method = RequestMethod.GET)
	public Response getPersonaByUsuario(@RequestParam String usuario) {
		try {
			Optional<VWTrackingPersonas> optPer = trackingPersonas.findByUsuario(usuario);
			if(!optPer.isPresent()) return new Response(Response.FAIL, "El usuario no existe");
			return new Response(Response.OK, optPer.get());
		} catch (Exception e) {
			return new Response(Response.FAIL, e);
		}
	}
	
	@RequestMapping(path = "/getPersonaById", method = RequestMethod.GET)
	public Response getPersonaById(@RequestParam String idPersona) {
		try {
			Optional<VWTrackingPersonas> optPer = trackingPersonas.findByIdPaciente(idPersona);
			if(!optPer.isPresent()) return new Response(Response.FAIL, "El usuario no existe");
			return new Response(Response.OK, optPer.get());
		} catch (Exception e) {
			return new Response(Response.FAIL, e);
		}
	}
	
	@RequestMapping(path = "/getConvenioById", method = RequestMethod.GET)
	public Response getConvenioById(@RequestParam String idPersona) {
		try {
			List<Personas> optPer = personas.findById(idPersona);
			if(optPer.size() == 0) return new Response(Response.FAIL, "El usuario no existe");
			return new Response(Response.OK, optPer.get(0));
		} catch (Exception e) {
			return new Response(Response.FAIL, e);
		}
	}
	
	@RequestMapping(path = "/getPersonasByCliente", method = RequestMethod.GET)
	public Response getPersonasByCliente(@RequestParam String idCliente) {
		try {
			return new Response(Response.OK, trackingPersonas.findAllByIdCliente(idCliente));
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
	
	@RequestMapping(path = "/findUsuarioPersonaByDocumento", method = RequestMethod.GET)
	public Response findUsuarioPersonaByDocumento(@RequestParam String tipoDocumento, @RequestParam String numeroDocumento) {
		try {
			List<Personas> personasList = personas.findByIdTipoDocumentoAndNumeroDocumento(tipoDocumento, numeroDocumento);
			if(personasList.size() == 0) return new Response(Response.FAIL, "No persona");
			
			List<Usuarios> usuariosList = usuarios.findByIdPersonas(personasList.get(0).getId());
			if(usuariosList.size() == 0) return new Response(Response.FAIL, "No usuario;" + personasList.get(0).getId());
			
			return new Response(Response.OK, personasList.get(0));
		} catch (Exception e) {
			return new Response(Response.FAIL, e);
		}
	}
	
	@RequestMapping(path = "/guardarPersona", method = RequestMethod.POST, headers = "Accept=application/json")
	public Response guardarPersona(@RequestBody Personas persona) {
		try {
			personas.save(persona);
			return new Response(Response.OK, personas.findByIdTipoDocumentoAndNumeroDocumento(persona.getIdTipoDocumento(), persona.getNumeroDocumento()).get(0));
		} catch (Exception e) {
			return new Response(Response.FAIL, e);
		}
	}
	
	@RequestMapping(path = "/crearUsuario", method = RequestMethod.POST, headers = "Accept=application/json")
	public Response crearUsuario(@RequestBody Usuario usuario) {
		try {
			List<Usuarios> listUser = usuarios.findByUsuario(usuario.getUsuario());
			List<UsuarioRolesAplicacion> listUserRol = usuarioRoles.findByUsuario(usuario.getUsuario());
			
			if(listUser.size() != 0 || listUserRol.size() != 0) return new Response(Response.FAIL, "El usuario ya se encuentra registrado");
			
			Usuarios user = new Usuarios();
			user.setUsuario(usuario.getUsuario());
			user.setFechaVencimiento(usuario.getFechaVencimiento());
			user.setEstado(usuario.getEstado());
			user.setPassword(usuario.getPassword());
			user.setIdPersonas(usuario.getIdPersonas());
			
			UsuarioRolesAplicacion userRol = new UsuarioRolesAplicacion();
			userRol.setIdRol(usuario.getIdRol());
			userRol.setIdAplicacion(usuario.getIdAplicacion());
			userRol.setUsuario(usuario.getUsuario());
			userRol.setEstado(usuario.getEstado());
			
			usuarios.save(user);
			usuarioRoles.save(userRol);
			
			return new Response(Response.OK, usuario);
		} catch (Exception e) {
			return new Response(Response.FAIL, e);
		}
	}
	
	
	/**
	 * TODO: Borrar :3
	 * Este metodo es netamente de prueba por favor BORRAR jajajaja
	 * @return
	 */
	@RequestMapping(path = "/prueba", method = RequestMethod.GET)
	public Response prueba() {
		try {
			return new Response(Response.OK, personas.findAll());
		} catch (Exception e) {
			return new Response(Response.FAIL, e);
		}
	}

}

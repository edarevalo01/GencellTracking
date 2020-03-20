package com.gencell.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.gencell.entities.UsuarioRolesAplicacion;

@Repository
public interface UsuarioRolesAplicacionRepository extends CrudRepository<UsuarioRolesAplicacion, Long>{

	public List<UsuarioRolesAplicacion> findByUsuario(String usuario);
	
}

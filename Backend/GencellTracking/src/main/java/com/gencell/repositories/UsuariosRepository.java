package com.gencell.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.gencell.entities.Usuarios;

@Repository
public interface UsuariosRepository extends CrudRepository<Usuarios, Long> {
	
	public List<Usuarios> findByIdPersonas(String idPersonas);
	
	public List<Usuarios> findByUsuario(String usuario);

}

package com.gencell.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.gencell.entities.Personas;

@Repository
public interface PersonasRepository extends CrudRepository<Personas, Long> {
	
	public List<Personas> findByIdTipoDocumentoAndNumeroDocumento(String tipoDocumento, String numeroDocumento);
	
	public List<Personas> findById(String id);
	
}

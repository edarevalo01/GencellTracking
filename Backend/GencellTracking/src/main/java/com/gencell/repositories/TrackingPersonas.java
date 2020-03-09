package com.gencell.repositories;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.gencell.entities.VWTrackingPersonas;

@Repository
public interface TrackingPersonas extends CrudRepository<VWTrackingPersonas, Long> {
	
	public Optional<VWTrackingPersonas> findByIdPaciente(String idPaciente);
	
	public Optional<VWTrackingPersonas> findByUsuario(String usuario);
	
	public Iterable<VWTrackingPersonas> findAllByIdCliente(String idCliente);
	
}

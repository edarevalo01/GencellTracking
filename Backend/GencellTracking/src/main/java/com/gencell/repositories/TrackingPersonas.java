package com.gencell.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.gencell.entities.VWTrackingPersonas;

@Repository
public interface TrackingPersonas extends CrudRepository<VWTrackingPersonas, Long> {
	
	public Iterable<VWTrackingPersonas> findByIdPaciente(String idPaciente);
	
}

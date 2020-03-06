package com.gencell.repositories;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.gencell.entities.VWTrackingEstadoPeticiones;

@Repository
public interface TrackingEstadoPeticiones extends CrudRepository<VWTrackingEstadoPeticiones, Long> {
	
	@Query(
		value = "SELECT * FROM gencell_dev.VWTrackingEstadoPeticiones where idPaciente = ?1",
		nativeQuery = true
	)
	public Iterable<VWTrackingEstadoPeticiones> findAllByIdPaciente(String idPaciente);
	
	@Query(
			value = "SELECT * FROM gencell_dev.VWTrackingEstadoPeticiones where idPeticion = ?1",
			nativeQuery = true
		)
	public Iterable<VWTrackingEstadoPeticiones> findAllByIdPeticion(String idPeticion);
	
}

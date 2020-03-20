package com.gencell.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.gencell.entities.VWTrackingEstadoPeticiones;

@Repository
public interface TrackingEstadoPeticionesRepository extends CrudRepository<VWTrackingEstadoPeticiones, Long> {
	
//	@Query(
//		value = "SELECT * FROM gencell_dev.VWTrackingEstadoPeticiones where idPaciente = ?1",
//		nativeQuery = true
//	)
	public Iterable<VWTrackingEstadoPeticiones> findAllByIdPaciente(String idPaciente);
	
	public Iterable<VWTrackingEstadoPeticiones> findAllByIdPeticion(String idPeticion);
	
	public Iterable<VWTrackingEstadoPeticiones> findAllByIdCliente(String idCliente);
	
}

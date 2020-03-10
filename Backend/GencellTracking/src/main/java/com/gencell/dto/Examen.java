package com.gencell.dto;

public class Examen {
	
	public String idPaciente;
	
	public String idCliente;
	
	public String idEstado;
	
	public String activo;
	
	public String descripcion;
	
	public String fechaCreacion;
	
	public String diagnostico;
	
	public String observaciones;
	
	public Examen(String idPaciente, String idCliente, String idEstado, String activo, String descripcion,
			String fechaCreacion, String diagnostico, String observaciones) {
		this.idPaciente = idPaciente;
		this.idCliente = idCliente;
		this.idEstado = idEstado;
		this.activo = activo;
		this.descripcion = descripcion;
		this.fechaCreacion = fechaCreacion;
		this.diagnostico = diagnostico;
		this.observaciones = observaciones;
	}
	
	public String getIdPaciente() {
		return idPaciente;
	}

	public void setIdPaciente(String idPaciente) {
		this.idPaciente = idPaciente;
	}

	public String getIdCliente() {
		return idCliente;
	}

	public void setIdCliente(String idCliente) {
		this.idCliente = idCliente;
	}

	public String getIdEstado() {
		return idEstado;
	}

	public void setIdEstado(String idEstado) {
		this.idEstado = idEstado;
	}

	public String getActivo() {
		return activo;
	}

	public void setActivo(String activo) {
		this.activo = activo;
	}

	public String getDescripcion() {
		return descripcion;
	}

	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}

	public String getFechaCreacion() {
		return fechaCreacion;
	}

	public void setFechaCreacion(String fechaCreacion) {
		this.fechaCreacion = fechaCreacion;
	}

	public String getDiagnostico() {
		return diagnostico;
	}

	public void setDiagnostico(String diagnostico) {
		this.diagnostico = diagnostico;
	}

	public String getObservaciones() {
		return observaciones;
	}

	public void setObservaciones(String observaciones) {
		this.observaciones = observaciones;
	}
	
}

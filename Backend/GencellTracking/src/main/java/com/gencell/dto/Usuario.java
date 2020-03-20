package com.gencell.dto;

import java.util.Date;

public class Usuario {
	
	private String idRol;
	
	private String idAplicacion;
	
	private String usuario;
	
	private String estado;
	
	private Date fechaVencimiento;
	
	private String password;
	
	private String idPersonas;

	public String getIdRol() {
		return idRol;
	}

	public void setIdRol(String idRol) {
		this.idRol = idRol;
	}

	public String getIdAplicacion() {
		return idAplicacion;
	}

	public void setIdAplicacion(String idAplicacion) {
		this.idAplicacion = idAplicacion;
	}

	public String getUsuario() {
		return usuario;
	}

	public void setUsuario(String usuario) {
		this.usuario = usuario;
	}

	public String getEstado() {
		return estado;
	}

	public void setEstado(String estado) {
		this.estado = estado;
	}

	public Date getFechaVencimiento() {
		return fechaVencimiento;
	}

	public void setFechaVencimiento(Date fechaVencimiento) {
		this.fechaVencimiento = fechaVencimiento;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getIdPersonas() {
		return idPersonas;
	}

	public void setIdPersonas(String idPersonas) {
		this.idPersonas = idPersonas;
	}
	
}


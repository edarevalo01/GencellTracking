package com.gencell.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

import org.hibernate.annotations.Immutable;

@Entity
@Immutable
public class Usuarios {

	@Id
	@Column(name = "usuario")
	private String usuario;
	
	@Column(name = "fechaVencimiento")  
	private String fechaVencimiento;
	
	@Column(name = "estado")  
	private String estado;
	
	@Column(name = "password")  
	private String password;
	
	@Column(name = "idPersonas")  
	private String idPersonas;

	public String getUsuario() {
		return usuario;
	}

	public void setUsuario(String usuario) {
		this.usuario = usuario;
	}

	public String getFechaVencimiento() {
		return fechaVencimiento;
	}

	public void setFechaVencimiento(String fechaVencimiento) {
		this.fechaVencimiento = fechaVencimiento;
	}

	public String getEstado() {
		return estado;
	}

	public void setEstado(String estado) {
		this.estado = estado;
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

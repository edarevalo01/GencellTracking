package com.gencell.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.hibernate.annotations.Immutable;

@Entity
@Immutable
public class UsuarioRolesAplicacion {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "idUsuarioRolesAplicacion")
	private String idUsuarioRolesAplicacion;
	
	@Column(name = "idRol")
	private String idRol;
	
	@Column(name = "idAplicacion")
	private String idAplicacion;
	
	@Column(name = "usuario")
	private String usuario;
	
	@Column(name = "estado")
	private String estado;

	public String getIdUsuarioRolesAplicacion() {
		return idUsuarioRolesAplicacion;
	}

	public void setIdUsuarioRolesAplicacion(String idUsuarioRolesAplicacion) {
		this.idUsuarioRolesAplicacion = idUsuarioRolesAplicacion;
	}

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
	
}

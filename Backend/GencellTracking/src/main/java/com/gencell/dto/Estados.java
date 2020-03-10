package com.gencell.dto;

import java.util.ArrayList;

public class Estados {
	
	public String idEstado;
	
	public ArrayList<Examen> examenes;
	
	public Estados(String idEstado, ArrayList<Examen> examenes) {
		super();
		this.idEstado = idEstado;
		this.examenes = examenes;
	}

	public String getIdEstado() {
		return idEstado;
	}

	public void setIdEstado(String idEstado) {
		this.idEstado = idEstado;
	}

	public ArrayList<Examen> getExamenes() {
		return examenes;
	}

	public void setExamenes(ArrayList<Examen> examenes) {
		this.examenes = examenes;
	}
	
}

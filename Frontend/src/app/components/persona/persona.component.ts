import { Component, OnInit } from "@angular/core";
import { Persona } from "src/app/model/persona";
import { Examen } from "src/app/model/examen";
import { Router } from "@angular/router";

@Component({
	selector: "app-persona",
	templateUrl: "./persona.component.html",
	styleUrls: ["./persona.component.scss"]
})
export class PersonaComponent implements OnInit {
	public persona: Persona;

	constructor(private router: Router) {
		this.getPersona();
	}

	getPersona() {
		this.persona = new Persona();
		this.persona.nombreCompleto = "Edwar Alejandro Arevalo Nocua";
		let examen1 = new Examen();
		examen1.nombre = "Exoma trio convencional | BGI - (Secuencia 23.000 Genes, Analisis de 3.400 Genes Omin)";
		examen1.fechaCreacion = "12/01/2020";
		examen1.fechaFin = null;
		examen1.idExamen = "25014";
		examen1.estado = [
			{ id: "1", nombre: "Ingreso", estado: "N" },
			{ id: "2", nombre: "Asignación envíos", estado: "N" },
			{ id: "3", nombre: "Envío", estado: "N" },
			{ id: "4", nombre: "Asignación resultados", estado: "N" },
			{ id: "5", nombre: "Gestión resultados", estado: "N" },
			{ id: "6", nombre: "Validación resultados", estado: "N" },
			{ id: "6", nombre: "Aprobación resultados", estado: "S" }
		];
		this.persona.examenes = [examen1, examen1, examen1, examen1, examen1, examen1, examen1];
	}

	salir() {
		this.router.navigateByUrl("login");
	}

	ngOnInit() {}
}

import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Persona } from "src/app/model/persona";
import { Examen } from "src/app/model/examen";

@Component({
	selector: "app-eps",
	templateUrl: "./eps.component.html",
	styleUrls: ["./eps.component.scss"]
})
export class EpsComponent implements OnInit {
	columnas: any[] = [
		{ field: "documento", header: "Documento" },
		{ field: "nombreCompleto", header: "Nombre Completo" },
		{ field: "correo", header: "Correo electrónico" },
		{ field: "celular", header: "Celular" },
		{ field: "ciudad", header: "Ciudad" },
		{ field: "examenes", header: "Ver resumen" }
	];

	pacientes: any[] = [
		{
			id: "1",
			documento: "1023954627",
			nombreCompleto: "Edwar Alejandro Arevalo Nocua",
			correo: "edarevla@gmail.com",
			celular: "3112345678",
			ciudad: "Bogota",
			examenes: "7"
		},
		{
			id: "1",
			documento: "1023954627",
			nombreCompleto: "Edwar Alejandro Arevalo Nocua",
			correo: "edarevla@gmail.com",
			celular: "3112345678",
			ciudad: "Bogota",
			examenes: "7"
		},
		{
			id: "1",
			documento: "3023954627",
			nombreCompleto: "Edwar Alejandro Arevalo Nocua",
			correo: "edarevla@gmail.com",
			celular: "3112345678",
			ciudad: "Bogota",
			examenes: "7"
		},
		{
			id: "1",
			documento: "1023954627",
			nombreCompleto: "Edwar Alejandro Arevalo Nocua",
			correo: "edarevla@gmail.com",
			celular: "3112345678",
			ciudad: "Bogota",
			examenes: "7"
		},
		{
			id: "1",
			documento: "1023954627",
			nombreCompleto: "Edwar Alejandro Arevalo Nocua",
			correo: "edarevla@gmail.com",
			celular: "3112345678",
			ciudad: "Medellin",
			examenes: "7"
		},
		{
			id: "1",
			documento: "1023954627",
			nombreCompleto: "Edwar Alejandro Arevalo Nocua",
			correo: "edarevla@gmail.com",
			celular: "4123123",
			ciudad: "Bogota",
			examenes: "7"
		},
		{
			id: "1",
			documento: "3023954627",
			nombreCompleto: "Edwar Alejandro Arevalo Nocua",
			correo: "correo@gmail.com",
			celular: "3112345678",
			ciudad: "Bogota",
			examenes: "7"
		},
		{
			id: "1",
			documento: "2023954627",
			nombreCompleto: "Edwar Alejandro Arevalo Pillo",
			correo: "edarevla@gmail.com",
			celular: "3112345678",
			ciudad: "Bogota",
			examenes: "7"
		},
		{
			id: "1",
			documento: "1023954627",
			nombreCompleto: "Juanillo Alejandro Arevalo Nocua",
			correo: "edarevla@gmail.com",
			celular: "3112345678",
			ciudad: "Bogota",
			examenes: "7"
		}
	];
	public pacienteSelected: any = {
		id: "1",
		documento: "1023954627",
		nombreCompleto: "Edwar Alejandro Arevalo Nocua",
		correo: "edarevla@gmail.com",
		celular: "3112345678",
		ciudad: "Bogota",
		examenes: "7"
	};

	public displayPersona: boolean = false;
	public persona: Persona;

	constructor(private router: Router) {
		this.getPersona();
	}

	ngOnInit() {}

	openPersona(idPersona: string) {
		this.pacienteSelected = this.pacientes[0];
		if (idPersona == "1") {
			this.displayPersona = true;
		}
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
}

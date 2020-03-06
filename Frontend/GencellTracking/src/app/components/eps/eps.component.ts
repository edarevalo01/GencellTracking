import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Persona } from "src/app/model/persona";
import { Examen } from "src/app/model/examen";
import { GeneralService } from "src/app/services/general.service";
import { Respuesta } from "src/app/model/respuesta";

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

	public respuesta: Respuesta;
	public pacientes: Persona[] = [];
	public pacienteSelected: Persona;
	public yahay: boolean = false;

	// public pacienteSelected: any = {
	// 	id: "1",
	// 	documento: "1023954627",
	// 	nombreCompleto: "Edwar Alejandro Arevalo Nocua",
	// 	correo: "edarevla@gmail.com",
	// 	celular: "3112345678",
	// 	ciudad: "Bogota",
	// 	examenes: "7"
	// };

	public displayPersona: boolean = false;
	public persona: Persona;

	constructor(private service: GeneralService, private router: Router) {
		// this.getPersona();
		this.getPacientes();
	}

	ngOnInit() {}

	getPacientes() {
		this.service.getAllPersonas().subscribe(
			respuestaObs => {
				this.respuesta = respuestaObs;
				console.log(respuestaObs);
			},
			error => {
				console.error(error);
			},
			() => {
				if (this.respuesta.status == "ok") {
					this.pacientes = this.respuesta.message;
					this.yahay = true;
				} else {
					console.error(this.respuesta.message);
				}
			}
		);
	}

	// openPersona(idPersona: string) {
	// 	this.pacienteSelected = this.pacientes[0];
	// 	if (idPersona == "1") {
	// 		this.displayPersona = true;
	// 	}
	// }

	// getPersona() {
	// 	this.persona = new Persona();
	// 	this.persona.nombreCompleto = "Edwar Alejandro Arevalo Nocua";
	// 	let examen1 = new Examen();
	// 	examen1.nombre = "Exoma trio convencional | BGI - (Secuencia 23.000 Genes, Analisis de 3.400 Genes Omin)";
	// 	examen1.fechaCreacion = "12/01/2020";
	// 	examen1.fechaFin = null;
	// 	examen1.idExamen = "25014";
	// 	examen1.estado = [
	// 		{ id: "1", nombre: "Ingreso", estado: "N" },
	// 		{ id: "2", nombre: "Asignación envíos", estado: "N" },
	// 		{ id: "3", nombre: "Envío", estado: "N" },
	// 		{ id: "4", nombre: "Asignación resultados", estado: "N" },
	// 		{ id: "5", nombre: "Gestión resultados", estado: "N" },
	// 		{ id: "6", nombre: "Validación resultados", estado: "N" },
	// 		{ id: "6", nombre: "Aprobación resultados", estado: "S" }
	// 	];
	// 	this.persona.examenes = [examen1, examen1, examen1, examen1, examen1, examen1, examen1];
	// }

	salir() {
		this.router.navigateByUrl("login");
	}
}

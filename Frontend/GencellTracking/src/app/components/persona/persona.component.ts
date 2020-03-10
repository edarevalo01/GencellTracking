import { Component, OnInit, OnDestroy } from "@angular/core";
import { Persona } from "src/app/model/persona";
import { Router } from "@angular/router";
import { GeneralService } from "src/app/services/general.service";
import { Respuesta } from "src/app/model/respuesta";
import { EstadoPeticiones } from "src/app/model/estado-peticiones";

@Component({
	selector: "app-persona",
	templateUrl: "./persona.component.html",
	styleUrls: ["./persona.component.scss"]
})
export class PersonaComponent implements OnInit {
	private idPersona: string = "";
	private respuestaPersona: Respuesta;
	private respuestaPeticion: Respuesta;

	public persona: Persona;
	public peticiones: EstadoPeticiones[] = [];
	public cantidadPeticiones: number = 0;
	public infoCargada: boolean = false;
	public canceladoDevolucion: boolean = false;
	public canceladoDevolucionObj: any;

	constructor(private service: GeneralService, private router: Router) {
		this.idPersona = sessionStorage.getItem("f0Y9MFF4ZX");
		if (!this.idPersona) {
			this.router.navigateByUrl("login");
		}
		this.getPersona();
	}

	getPersona() {
		this.service.getPersonaById(this.idPersona).subscribe(
			respuestaObs => {
				this.respuestaPersona = respuestaObs;
			},
			error => {
				console.error(error);
			},
			() => {
				if (this.respuestaPersona.status == "fail") {
				} else if (this.respuestaPersona.status == "ok") {
					this.persona = this.respuestaPersona.message;
					this.getPeticiones();
				}
			}
		);
	}

	getPeticiones() {
		this.service.getEstadosByPaciente(this.persona.idPaciente).subscribe(
			respuestaObs => {
				this.respuestaPeticion = respuestaObs;
			},
			error => {
				console.error(error);
			},
			() => {
				if (this.respuestaPeticion.status == "fail") {
				} else if (this.respuestaPeticion.status == "ok") {
					this.peticiones = this.respuestaPeticion.message;
					this.infoCargada = true;
					this.getCantidadPeticiones();
				}
			}
		);
	}

	getCantidadPeticiones() {
		this.cantidadPeticiones = this.peticiones.length;
		this.peticiones.map(peticion => {
			peticion.estados = this.estados;
			peticion.examenes.map(examen => {
				peticion.estados.map(est => {
					if (est.estado == examen.idEstado) {
						est.activo = examen.activo;
					}
					if (["31", "23", "7", "9", "11", "16", "18"].indexOf(examen.idEstado) > -1 && examen.activo == "S") {
						this.canceladoDevolucion = true;
						this.canceladoDevolucionObj = {
							nombre: examen.descripcion,
							observacion: examen.observaciones
						};
					}
				});
			});
		});
	}

	salir() {
		sessionStorage.clear();
		this.router.navigateByUrl("login");
	}

	ngOnInit() {}

	public estados: any[] = [
		{ estado: "21", nombre: "De Ingresos a Asignación de Envíos", activo: "E" },
		{ estado: "5", nombre: "Paso de Ingresos a Envíos", activo: "E" },
		{ estado: "6", nombre: "Paso de Envíos a Coordinación de Transcripción", activo: "E" },
		{ estado: "8", nombre: "Paso de Coordinación de Transcripción a Interpretación", activo: "E" },
		{ estado: "12", nombre: "Gestión de Resultados, en Validación de Genetista", activo: "E" },
		{ estado: "14", nombre: "En Revisión Final de Envío de Resultados", activo: "E" },
		{ estado: "15", nombre: "Resultados enviados", activo: "E" }
	];
}

import { Component, OnInit, Input, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { StringResourceHelper } from "src/app/model/string-resource-helper";
import { GeneralService } from "src/app/services/general.service";
import { Respuesta } from "src/app/model/respuesta";
import { Persona } from "src/app/model/persona";
import { EstadoPeticiones } from "src/app/model/estado-peticiones";

@Component({
	selector: "app-persona",
	templateUrl: "./persona.component.html",
	styleUrls: ["./persona.component.scss"]
})
export class PersonaComponent implements OnInit, OnDestroy {
	public stringHelper: StringResourceHelper = new StringResourceHelper("persona-component");
	@Input("idPersonaFrame") idPersonaFrame: string;
	private idPersona: string = "";
	private respuestaPersona: Respuesta;
	private respuestaPeticion: Respuesta;

	public persona: Persona;
	public peticiones: EstadoPeticiones[] = [];
	public cantidadPeticiones: number = 0;
	public infoCargada: boolean = false;

	public canceladoDevolucion: boolean = false;
	public canceladoDevolucionObj: any;

	constructor(private service: GeneralService, private router: Router) {}

	ngOnInit() {
		this.idPersona = localStorage.getItem("f0Y9MFF4ZX");
		if (!this.idPersona) {
			// TODO: Implementar TOAST
			if (this.idPersonaFrame) {
				this.idPersona = this.idPersonaFrame;
			} else {
				this.router.navigateByUrl("login");
			}
		}
		this.getPersona();
	}

	ngOnDestroy() {
		localStorage.clear();
	}

	getPersona() {
		this.service.getPersonaById(this.idPersona).subscribe(
			respuestaObs => {
				this.respuestaPersona = respuestaObs;
			},
			error => {
				// TODO: Implementar TOAST
				console.error(error);
			},
			() => {
				if (this.respuestaPersona.status == "fail") {
					// TODO: Implementar TOAST
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
				// TODO: Implementar TOAST
				console.error(error);
			},
			() => {
				if (this.respuestaPeticion.status == "fail") {
					// TODO: Implementar TOAST
				} else if (this.respuestaPeticion.status == "ok") {
					this.peticiones = this.respuestaPeticion.message;
					this.infoCargada = true;
					this.getCantidadPeticiones();
				}
			}
		);
	}

	getCantidadPeticiones() {
		//FIXME: Intentar mejorar esto
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

	public estados: any[] = [
		{ estado: "21", nombre: this.stringHelper.getResource("estado-21"), activo: "E" },
		{ estado: "5", nombre: this.stringHelper.getResource("estado-5"), activo: "E" },
		{ estado: "6", nombre: this.stringHelper.getResource("estado-6"), activo: "E" },
		{ estado: "8", nombre: this.stringHelper.getResource("estado-8"), activo: "E" },
		{ estado: "12", nombre: this.stringHelper.getResource("estado-12"), activo: "E" },
		{ estado: "14", nombre: this.stringHelper.getResource("estado-14"), activo: "E" },
		{ estado: "15", nombre: this.stringHelper.getResource("estado-15"), activo: "E" }
	];
}

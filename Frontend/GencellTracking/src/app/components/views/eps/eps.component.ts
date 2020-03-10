import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { Persona } from "src/app/model/persona";
import { GeneralService } from "src/app/services/general.service";
import { Respuesta } from "src/app/model/respuesta";

@Component({
	selector: "app-eps",
	templateUrl: "./eps.component.html",
	styleUrls: ["./eps.component.scss"]
})
export class EpsComponent implements OnInit, OnDestroy {
	public idEps: string = "";
	public idPersonaSelected: string = "";
	public respuestaPersonas: Respuesta;
	public listaPersonas: Persona[] = [];
	public infoCargada: boolean = false;
	public displayPersona: boolean = false;

	constructor(private service: GeneralService, private router: Router) {}

	ngOnInit() {
		localStorage.removeItem("f0Y9MFF4ZX");
		this.idEps = localStorage.getItem("uFZ2n4celu");
		if (!this.idEps) {
			this.router.navigateByUrl("loign");
		}
		this.getPacientes();
	}

	ngOnDestroy() {
		localStorage.clear();
	}

	getPacientes() {
		this.service.getPersonasByCliente(this.idEps).subscribe(
			respuestaObs => {
				this.respuestaPersonas = respuestaObs;
			},
			error => {
				//TODO: Implementar TOAST
				console.error(error);
			},
			() => {
				if (this.respuestaPersonas.status == "fail") {
					//TODO: Implementar TOAST
				} else if (this.respuestaPersonas.status == "ok") {
					this.listaPersonas = this.respuestaPersonas.message;
				}
				this.infoCargada = true;
			}
		);
	}

	openPersona(idPersona: string) {
		this.idPersonaSelected = idPersona;
		this.displayPersona = true;
	}
}

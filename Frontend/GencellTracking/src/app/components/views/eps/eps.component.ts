import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { StringResourceHelper } from "src/app/model/string-resource-helper";
import { GeneralService } from "src/app/services/general.service";
import { Respuesta } from "src/app/model/respuesta";
import { Persona } from "src/app/model/persona";
import { MessageService } from "primeng/api";

@Component({
	selector: "app-eps",
	templateUrl: "./eps.component.html",
	styleUrls: ["./eps.component.scss"],
	providers: [MessageService]
})
export class EpsComponent implements OnInit, OnDestroy {
	public stringHelper: StringResourceHelper = new StringResourceHelper("eps-component");
	public idEps: string = "";
	public idPersonaSelected: string = "";
	public respuestaConvenio: Respuesta;
	public respuestaPersonas: Respuesta;

	public listaPersonas: Persona[] = [];
	public convenio: Persona;
	public infoCargada: boolean = false;
	public displayPersona: boolean = false;

	public progress: boolean = false;

	constructor(private service: GeneralService, private router: Router, private messageService: MessageService) {}

	ngOnInit() {
		localStorage.removeItem("f0Y9MFF4ZX");
		this.idEps = localStorage.getItem("uFZ2n4celu");
		if (!this.idEps) {
			this.router.navigateByUrl("loign");
		}
		this.getInfoConvenio();
	}

	ngOnDestroy() {
		localStorage.clear();
	}

	getInfoConvenio() {
		this.progress = true;
		this.service.getConvenioById(this.idEps).subscribe(
			respuestaObs => {
				this.respuestaConvenio = respuestaObs;
			},
			error => {
				this.progress = false;
				this.messageService.add({ severity: "error", summary: "Ha ocurrido un error", detail: error });
				console.error(error);
			},
			() => {
				if (this.respuestaConvenio.status == "fail") {
					this.progress = false;
					this.messageService.add({
						severity: "warn",
						summary: "Fallo al cargar persona",
						detail: this.respuestaConvenio.message
					});
				} else if (this.respuestaConvenio.status == "ok") {
					this.convenio = this.respuestaConvenio.message;
					this.getPacientes();
				}
			}
		);
	}

	getPacientes() {
		this.service.getPersonasByCliente(this.idEps).subscribe(
			respuestaObs => {
				this.respuestaPersonas = respuestaObs;
			},
			error => {
				this.progress = false;
				this.messageService.add({ severity: "error", summary: "Ha ocurrido un error", detail: error });
				console.error(error);
			},
			() => {
				this.progress = false;
				if (this.respuestaPersonas.status == "fail") {
					this.messageService.add({
						severity: "warn",
						summary: "Fallo al cargar persona",
						detail: this.respuestaPersonas.message
					});
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

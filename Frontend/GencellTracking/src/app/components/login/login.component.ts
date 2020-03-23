import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { StringResourceHelper } from "src/app/model/string-resource-helper";

interface Doc {
	id: string;
	descrip: string;
}

@Component({
	selector: "app-login",
	templateUrl: "./login.component.html",
	styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
	public stringHelper: StringResourceHelper = new StringResourceHelper("login-component");
	public displayPosition: boolean = false;
	public position: string = "";
	public tiposDocumento: any[] = [
		{ id: null, descrip: "Tipo de documento" },
		{ id: "1", descrip: "Cédula de Ciudadania" },
		{ id: "2", descrip: "Cédula de Extranjería" },
		{ id: "3", descrip: "NIT" },
		{ id: "4", descrip: "Tarjeta de Identidad" },
		{ id: "5", descrip: "RC" },
		{ id: "6", descrip: "Registro médico" }
	];
	public documentoSelected: any;

	public fechaNacimiento: Date;

	constructor(private router: Router) {}

	ngOnInit() {}

	//FIXME: Esto es temporal, intentar encriptar los id de vista y de usuario con CryptoJS
	iniciarSesion(idUser: number) {
		if (idUser == 1) {
			//Paciente
			localStorage.setItem("f0Y9MFF4ZX", "1534"); //idPaciente
			localStorage.setItem("vdN9vH4WuD", "1"); //idVista
			this.router.navigateByUrl("main");
		} else if (idUser == 2) {
			//EPS
			localStorage.setItem("uFZ2n4celu", "94"); //idConvenio
			localStorage.setItem("vdN9vH4WuD", "2"); //idVista
			this.router.navigateByUrl("main");
		}
	}

	mostrarInscribir(position: string) {
		this.position = position;
		this.displayPosition = true;
	}
}

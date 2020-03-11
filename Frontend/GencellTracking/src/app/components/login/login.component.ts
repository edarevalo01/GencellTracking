import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { StringResourceHelper } from "src/app/model/string-resource-helper";

@Component({
	selector: "app-login",
	templateUrl: "./login.component.html",
	styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
	public stringHelper: StringResourceHelper = new StringResourceHelper("login-component");

	constructor(private router: Router) {}

	ngOnInit() {}

	//FIXME: Esto es temporal, intentar encriptar los id de vista y de usuario con CryptoJS
	iniciarSesion(idUser: number) {
		if (idUser == 1) {
			//Paciente
			localStorage.setItem("f0Y9MFF4ZX", "1534");
			localStorage.setItem("vdN9vH4WuD", "1"); //idVista
			this.router.navigateByUrl("main");
		} else if (idUser == 2) {
			//EPS
			localStorage.setItem("uFZ2n4celu", "94");
			localStorage.setItem("vdN9vH4WuD", "2"); //idVista
			this.router.navigateByUrl("main");
		}
	}
}

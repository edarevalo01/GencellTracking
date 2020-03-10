import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
	selector: "app-login",
	templateUrl: "./login.component.html",
	styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
	constructor(private router: Router) {}

	ngOnInit() {}

	iniciarSesion(idUser: number) {
		if (idUser == 1) {
			sessionStorage.setItem("f0Y9MFF4ZX", "1534");
			this.router.navigateByUrl("persona");
		} else if (idUser == 2) {
			sessionStorage.setItem("uFZ2n4celu", "24");
			this.router.navigateByUrl("eps");
		}
	}
}

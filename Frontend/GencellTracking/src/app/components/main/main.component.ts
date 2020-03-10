import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
	selector: "app-main",
	templateUrl: "./main.component.html",
	styleUrls: ["./main.component.scss"]
})
export class MainComponent implements OnInit {
	public idVista: string = "";

	constructor(private router: Router) {
		this.idVista = localStorage.getItem("vdN9vH4WuD");
		if (!this.idVista) {
			this.salir();
		}
	}

	salir() {
		localStorage.clear();
		this.router.navigateByUrl("login");
	}

	ngOnInit() {}
}

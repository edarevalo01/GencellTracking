import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { StringResourceHelper } from "src/app/model/string-resource-helper";

@Component({
	selector: "app-main",
	templateUrl: "./main.component.html",
	styleUrls: ["./main.component.scss"]
})
export class MainComponent implements OnInit {
	public stringHelper: StringResourceHelper = new StringResourceHelper("main-component");
	public idVista: string = "";

	constructor(private router: Router) {}

	salir() {
		localStorage.clear();
		this.router.navigateByUrl("login");
	}

	ngOnInit() {
		this.idVista = localStorage.getItem("vdN9vH4WuD");
		if (!this.idVista) {
			this.salir();
		}
	}
}

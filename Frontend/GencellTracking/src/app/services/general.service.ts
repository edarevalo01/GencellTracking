import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment.prod";
import { Respuesta } from "../model/respuesta";

@Injectable({
	providedIn: "root"
})
export class GeneralService {
	constructor(private http: HttpClient) {}

	getAllPersonas(): Observable<Respuesta> {
		return this.http.get<Respuesta>(environment.urlGetAllUsers);
	}
}

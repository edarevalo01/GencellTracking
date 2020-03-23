import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment.prod";
import { Respuesta } from "../model/respuesta";

@Injectable({
	providedIn: "root"
})
export class GeneralService {
	constructor(private http: HttpClient) {}

	login(usuario: string, clave: string): Observable<Respuesta> {
		let body = new HttpParams().set("usuario", usuario).set("clave", clave);
		return this.http.post<Respuesta>(environment.urlLogin, body);
	}

	getPersonaByUsuario(usuario: string): Observable<Respuesta> {
		let param = new HttpParams().set("usuario", usuario);
		return this.http.get<Respuesta>(environment.urlGetPersonaByUsuario, { params: param });
	}

	getPersonaById(idPersona: string): Observable<Respuesta> {
		let param = new HttpParams().set("idPersona", idPersona);
		return this.http.get<Respuesta>(environment.urlGetPersonaById, { params: param });
	}

	getConvenioById(idPersona: string): Observable<Respuesta> {
		let param = new HttpParams().set("idPersona", idPersona);
		return this.http.get<Respuesta>(environment.urlGetConvenioById, { params: param });
	}

	getPersonasByCliente(idCliente: string): Observable<Respuesta> {
		let param = new HttpParams().set("idCliente", idCliente);
		return this.http.get<Respuesta>(environment.urlGetPersonasByCliente, { params: param });
	}

	getEstadosByPaciente(idPaciente: string): Observable<Respuesta> {
		let param = new HttpParams().set("idPaciente", idPaciente);
		return this.http.get<Respuesta>(environment.urlGetEstadosByPaciente, { params: param });
	}

	getEstadosByCliente(idCliente: string): Observable<Respuesta> {
		let param = new HttpParams().set("idCliente", idCliente);
		return this.http.get<Respuesta>(environment.urlGetEstadosByCliente, { params: param });
	}

	getEstadosByPeticion(idPeticion: string): Observable<Respuesta> {
		let param = new HttpParams().set("idPeticion", idPeticion);
		return this.http.get<Respuesta>(environment.urlGetEstadosByPeticion, { params: param });
	}
}

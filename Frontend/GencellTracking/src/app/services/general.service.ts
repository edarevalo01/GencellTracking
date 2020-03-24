import { Injectable } from "@angular/core";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment.prod";
import { Respuesta } from "../model/respuesta";
import { PersonaCrear } from "../model/persona";
import { Usuario } from "../model/usuario";

@Injectable({
	providedIn: "root"
})
export class GeneralService {
	constructor(private http: HttpClient) {}

	login(usuario: string, clave: string): Observable<Respuesta> {
		let body = new HttpParams().set("usuario", usuario).set("clave", clave);
		return this.http.post<Respuesta>(environment.urlLogin, body);
	}

	getUsuarioByUsuario(usuario: string): Observable<Respuesta> {
		let param = new HttpParams().set("usuario", usuario);
		return this.http.get<Respuesta>(environment.urlGetUsuarioByUsuario, { params: param });
	}

	getTipoDocumentoById(id: string): Observable<Respuesta> {
		let param = new HttpParams().set("id", id);
		return this.http.get<Respuesta>(environment.urlGetTipoDocumentoById, { params: param });
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

	getPersonaByDocumento(tipoDocumento: string, numeroDocumento: string): Observable<Respuesta> {
		let params = new HttpParams().set("tipoDocumento", tipoDocumento).set("numeroDocumento", numeroDocumento);
		return this.http.get<Respuesta>(environment.urlGetPersonaByDocumento, { params: params });
	}

	guardarPersona(persona: PersonaCrear): Observable<Respuesta> {
		let body = new FormData().append("persona", encodeURI(JSON.stringify(persona)));
		let header = new HttpHeaders();
		header = header.set("Content-Type", "application/json");
		return this.http.post<Respuesta>(environment.urlGuardarPersona, persona, { headers: header });
	}

	crearUsuario(usuario: Usuario): Observable<Respuesta> {
		let body = new HttpParams().set("usuario", encodeURI(JSON.stringify(usuario)));
		let header = new HttpHeaders();
		header = header.set("Content-Type", "application/json");
		return this.http.post<Respuesta>(environment.urlCrearUsuario, usuario, { headers: header });
	}
}

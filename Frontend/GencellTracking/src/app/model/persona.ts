import { Examen } from "./examen";

export class Persona {
	public id: string;
	public documento: string;
	public nombreCompleto: string;
	public correo: string;
	public celular: string;
	public ciudad: string;
	public examenes: Examen[] = [];
}

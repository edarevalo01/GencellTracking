import { Examen } from "./examen";

export class Persona {
	public nombreCompleto: string;
	public examenes: Examen[];

	constructor() {
		this.nombreCompleto = "";
		this.examenes = [];
	}
}

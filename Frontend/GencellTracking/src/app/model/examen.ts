import { Estado } from "./estado";

export class Examen {
	public idExamen: string;
	public nombre: string;
	public fechaCreacion: string;
	public fechaFin: string;
	public estado: Estado[];

	constructor() {
		this.idExamen = "";
		this.nombre = "";
		this.fechaCreacion = "";
		this.fechaFin = "";
		this.estado = [];
	}
}

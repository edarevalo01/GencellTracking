export class Persona {
	public idPaciente: string;
	public tipoDocumento: string;
	public numeroDocumento: string;
	public primerNombre: string;
	public segundoNombre: string;
	public primerApellido: string;
	public segundoApellido: string;
	public email: string;
	public celular: string;
	public nombreCiudad: string;
	public idCliente: string;
	public usuario: string;
}
export class PersonaCrear {
	public idPadre: null;
	public idTipoPersona: string; //OBLIGATORIO
	public idTipoDocumento: string; //OBLIGATORIO
	public idCiudades: string;
	public numeroDocumento: string; //OBLIGATORIO
	public primerNombre: string; //OBLIGATORIO
	public segundoNombre: string; //OBLIGATORIO
	public primerApellido: string; //OBLIGATORIO
	public segundoApellido: string; //OBLIGATORIO
	public idGenero: string; //OBLIGATORIO
	public fechaNacimiento: string; //OBLIGATORIO
	public celular: string; //OBLIGATORIO
	public fijo: string; //OBLIGATORIO
	public email: string; //OBLIGATORIO
	public convenio: string;
	public activo: string;
	public cargo: string;
	public created_at: string;
	public updated_at: string;
	public foto: string;
	public usuarioCreacion: string;
	public nombreUsuarioCreacion: string;
}

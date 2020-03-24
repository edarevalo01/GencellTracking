import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { StringResourceHelper } from "src/app/model/string-resource-helper";
import { GeneralService } from "src/app/services/general.service";
import { Respuesta } from "src/app/model/respuesta";
import { PersonaCrear } from "src/app/model/persona";
import { Usuario } from "src/app/model/usuario";
import { MessageService } from "primeng/api";

@Component({
	selector: "app-login",
	templateUrl: "./login.component.html",
	styleUrls: ["./login.component.scss"],
	providers: [MessageService]
})
export class LoginComponent implements OnInit {
	public tiposDocumento: any[] = [
		{ id: null, descrip: "Tipo de documento" },
		{ id: "1", descrip: "Cédula de Ciudadania" },
		{ id: "2", descrip: "Cédula de Extranjería" },
		{ id: "3", descrip: "NIT" },
		{ id: "4", descrip: "Tarjeta de Identidad" },
		{ id: "5", descrip: "RC" },
		{ id: "6", descrip: "Registro médico" }
	];

	public tiposPersona: any[] = [
		{ id: null, tipo: "Tipo de persona" },
		{ id: "3", tipo: "Particular" },
		{ id: "1", tipo: "EPS" },
		{ id: "2", tipo: "IPS" }
	];

	public generos: any[] = [
		{ id: null, genero: "Genero" },
		{ id: "1", genero: "Femenino" },
		{ id: "2", genero: "Masculino" }
	];

	public stringHelper: StringResourceHelper = new StringResourceHelper("login-component");
	public progress: boolean = false;
	public login: boolean = true;
	public preRegistro: boolean = false;
	public registro: boolean = false;

	public docLogin: string = "";
	public passLogin: string = "";
	public responseLogin: Respuesta;
	public responseUsuario: Respuesta;
	public responsePersona: Respuesta;
	public personaUsuario: Usuario;

	public documentoReg: string = "";
	public documentoSelected: any = this.tiposDocumento[0];
	public primerNombre: string = "";
	public segundoNombre: string = "";
	public primerApellido: string = "";
	public segundoApellido: string = "";
	public contrasena: string = "";
	public personaSelected: any = this.tiposPersona[0];
	public celular: string = "";
	public fijo: string = "";
	public correo: string = "";
	public fechaNacimiento: Date;
	public generoSelected: any = this.generos[0];

	public personaReg: PersonaCrear = new PersonaCrear();
	public usuarioReg: Usuario = new Usuario();
	public existePersona: boolean = false;
	public idPersonaRegistrada: string = "-1";

	constructor(private service: GeneralService, private router: Router, private messageService: MessageService) {}

	ngOnInit() {}

	iniciarSesion() {
		this.progress = true;
		this.service.login(this.docLogin, this.passLogin).subscribe(
			respObs => {
				this.responseLogin = respObs;
			},
			error => {
				this.progress = false;
				this.messageService.add({ severity: "error", summary: "Error", detail: error });
			},
			() => {
				if (this.responseLogin.status == "fail") {
					this.progress = false;
					this.messageService.add({ severity: "warn", summary: "Login fallido", detail: this.responseLogin.message });
				} else if (this.responseLogin.status == "ok") {
					this.messageService.add({ severity: "success", summary: "Ingreso satisfactorio." });
					this.getInfoUsuario();
				}
			}
		);
	}

	getInfoUsuario() {
		this.service.getUsuarioByUsuario(this.docLogin).subscribe(
			respObs => {
				this.responseUsuario = respObs;
			},
			error => {
				this.progress = false;
			},
			() => {
				if (this.responseUsuario.status == "fail") {
					this.progress = false;
					this.messageService.add({
						severity: "warn",
						summary: "Fallo al traer información de usuario",
						detail: this.responseUsuario.message
					});
				} else if (this.responseUsuario.status == "ok") {
					this.personaUsuario = this.responseUsuario.message;

					this.getVista(this.personaUsuario.idPersonas);
				}
			}
		);
	}

	getVista(idPersona: string) {
		this.service.getTipoDocumentoById(idPersona).subscribe(respObs => {
			if (respObs.status == "fail") {
				this.progress = false;
				this.messageService.add({ severity: "warn", summary: "Fallo mostrar opciones", detail: respObs.message });
			} else if (respObs.status == "ok") {
				this.progress = false;
				if (respObs.message == "3") {
					// EPS
					localStorage.setItem("uFZ2n4celu", idPersona); //idConvenio
					localStorage.setItem("vdN9vH4WuD", "2"); //idVista
					this.router.navigateByUrl("main");
				} else {
					// Paciente
					localStorage.setItem("f0Y9MFF4ZX", idPersona); //idPaciente
					localStorage.setItem("vdN9vH4WuD", "1"); //idVista
					this.router.navigateByUrl("main");
				}
			}
		});
	}

	getPersona() {
		this.messageService.clear();
		if (this.documentoReg == "") {
			this.messageService.add({
				severity: "warn",
				summary: "El número de documento no puede estar vacío."
			});
			return;
		}
		if (this.documentoSelected.id == null) {
			this.messageService.add({
				severity: "warn",
				summary: "El tipo de documento no puede estar vacío."
			});
			return;
		}
		this.progress = true;
		this.service.getPersonaByDocumento(this.documentoSelected.id, this.documentoReg).subscribe(
			respObs => {
				this.responsePersona = respObs;
			},
			error => {
				this.progress = false;
			},
			() => {
				if (this.responsePersona.status == "fail") {
					if (this.responsePersona.message.split(";")[0] == "No usuario") {
						this.idPersonaRegistrada = this.responsePersona.message.split(";")[1];
						this.service.getConvenioById(this.responsePersona.message.split(";")[1]).subscribe(respId => {
							this.personaReg = respId.message;
							this.fillData();
						});
					} else {
						this.habilitar(false, false, true);
						this.progress = false;
						this.messageService.add({
							severity: "warn",
							summary: "No tiene un usuario creado",
							detail: "No existe un usuario asociado a este número de documento."
						});
					}
				} else if (this.responsePersona.status == "ok") {
					this.messageService.add({
						severity: "warn",
						summary: "La persona ya tiene un usuario asociado",
						detail: "Existe un usuario asociado a este número de documento."
					});
					this.personaReg = this.responsePersona.message;
					this.fillData();
				} else {
					this.progress = false;
					this.habilitar(false, false, true);
					this.messageService.add({
						severity: "warn",
						summary: "No existe un registro con este número de documento",
						detail: "No existe un usuario asociado a este número de documento."
					});
				}
			}
		);
	}

	fillData() {
		this.habilitar(false, false, true);
		this.existePersona = true;

		this.primerNombre = this.personaReg.primerNombre;
		this.segundoNombre = this.personaReg.segundoNombre;
		this.primerApellido = this.personaReg.primerApellido;
		this.segundoApellido = this.personaReg.segundoApellido;
		this.contrasena = this.usuarioReg.password;
		this.personaSelected = this.tiposPersona.find(tipo => tipo.id == this.personaReg.idTipoPersona); //;
		this.celular = this.personaReg.celular;
		this.fijo = this.personaReg.fijo;
		this.correo = this.personaReg.email;
		this.fechaNacimiento = new Date(this.personaReg.fechaNacimiento);
		this.generoSelected = this.generos.find(genero => genero.id == this.personaReg.idGenero); //;

		this.progress = false;
	}

	habilitar(login: boolean, preRegistro: boolean, registro: boolean) {
		this.login = login;
		this.preRegistro = preRegistro;
		this.registro = registro;
	}

	changeDoc() {
		this.habilitar(false, true, false);

		this.existePersona = false;
		this.primerNombre = "";
		this.segundoNombre = "";
		this.primerApellido = "";
		this.segundoApellido = "";
		this.contrasena = "";
		this.personaSelected = this.tiposPersona[0];
		this.celular = "";
		this.fijo = "";
		this.correo = "";
		this.fechaNacimiento = null;
		this.generoSelected = this.generos[0];
	}

	sendData() {
		this.personaReg.idTipoDocumento = this.documentoSelected.id;
		this.personaReg.numeroDocumento = this.documentoReg;
		this.personaReg.primerNombre = this.primerNombre;
		this.personaReg.segundoNombre = this.segundoNombre;
		this.personaReg.primerApellido = this.primerApellido;
		this.personaReg.segundoApellido = this.segundoApellido;
		this.usuarioReg.password = this.contrasena;
		this.personaReg.idTipoPersona = this.personaSelected.id;
		this.personaReg.celular = this.celular;
		this.personaReg.fijo = this.fijo;
		this.personaReg.email = this.correo;
		this.personaReg.fechaNacimiento =
			this.fechaNacimiento.getFullYear() + "-" + this.fechaNacimiento.getMonth() + "-" + this.fechaNacimiento.getDay();
		this.personaReg.idGenero = this.generoSelected.id;

		if (!this.existePersona) {
			this.personaReg.idPadre = null;
			this.personaReg.idCiudades = "149";
			this.personaReg.convenio = "N";
			this.personaReg.activo = "S";
			this.personaReg.cargo = null;
			this.personaReg.created_at = null;
			this.personaReg.updated_at = null;
			this.personaReg.foto = null;
			this.personaReg.usuarioCreacion = null;
			this.personaReg.nombreUsuarioCreacion = "tracking";

			this.progress = true;
			this.service.guardarPersona(this.personaReg).subscribe(
				respObs => {
					if (respObs.status == "ok") {
						this.usuarioReg.idRol = this.personaSelected.id == "3" ? "20" : "5";
						this.usuarioReg.idAplicacion = "6";
						this.usuarioReg.usuario = this.documentoReg;
						this.usuarioReg.fechaVencimiento = "2030-12-31";
						this.usuarioReg.estado = "A";
						this.usuarioReg.password = this.contrasena;
						this.usuarioReg.idPersonas = respObs.message.id;
						this.service.crearUsuario(this.usuarioReg).subscribe(respUser => {
							this.progress = false;
							if (respUser.status == "fail") {
								this.messageService.add({
									severity: "warn",
									summary: "No fue posible crear el usuario",
									detail: "Por favor comuniquese con un asesor"
								});
							} else if (respUser.status == "ok") {
								this.messageService.add({
									severity: "success",
									summary: "Usuario creado",
									detail: "Usuario creado satisfactoriamente"
								});
								this.changeDoc();
								this.habilitar(true, false, false);
							}
						});
					}
				},
				error => {},
				() => {}
			);
		} else {
			if (this.idPersonaRegistrada == "-1") {
				this.messageService.add({
					severity: "warn",
					summary: "No fue posible crear el usuario",
					detail: "El id es incorrecto. Por favor comuniquese con un asesor"
				});
			} else {
				this.usuarioReg.idRol = this.personaSelected.id == "3" ? "20" : "5";
				this.usuarioReg.idAplicacion = "6";
				this.usuarioReg.usuario = this.documentoReg;
				this.usuarioReg.fechaVencimiento = "2030-12-31";
				this.usuarioReg.estado = "A";
				this.usuarioReg.password = this.contrasena;
				this.usuarioReg.idPersonas = this.idPersonaRegistrada;

				this.progress = true;
				this.service.crearUsuario(this.usuarioReg).subscribe(respUser => {
					this.progress = false;
					if (respUser.status == "fail") {
						this.messageService.add({
							severity: "warn",
							summary: "No fue posible crear el usuario",
							detail: "Por favor comuniquese con un asesor"
						});
					} else if (respUser.status == "ok") {
						this.messageService.add({
							severity: "success",
							summary: "Usuario creado",
							detail: "Usuario creado satisfactoriamente"
						});
						this.changeDoc();
						this.habilitar(true, false, false);
					}
				});
			}
		}
	}
}

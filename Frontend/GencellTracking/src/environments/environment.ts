// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
	production: false,
	urlLogin: "http://68.183.58.203:6060/TrackingBack/login",
	urlGetUsuarioByUsuario: "http://68.183.58.203:6060/TrackingBack/getUsuarioByUsuario",
	urlGetTipoDocumentoById: "http://68.183.58.203:6060/TrackingBack/getTipoDocumentoById",
	urlGetPersonaByUsuario: "http://68.183.58.203:6060/TrackingBack/getPersonaByUsuario",
	urlGetPersonaById: "http://68.183.58.203:6060/TrackingBack/getPersonaById",
	urlGetConvenioById: "http://68.183.58.203:6060/TrackingBack/getConvenioById",
	urlGetPersonasByCliente: "http://68.183.58.203:6060/TrackingBack/getPersonasByCliente",
	urlGetEstadosByPaciente: "http://68.183.58.203:6060/TrackingBack/getEstadosByPaciente",
	urlGetEstadosByCliente: "http://68.183.58.203:6060/TrackingBack/getEstadosByCliente",
	urlGetEstadosByPeticion: "http://68.183.58.203:6060/TrackingBack/getEstadosByPeticion",

	urlGetPersonaByDocumento: "http://68.183.58.203:6060/TrackingBack/findUsuarioPersonaByDocumento",
	urlGuardarPersona: "http://68.183.58.203:6060/TrackingBack/guardarPersona",
	urlCrearUsuario: "http://68.183.58.203:6060/TrackingBack/crearUsuario"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

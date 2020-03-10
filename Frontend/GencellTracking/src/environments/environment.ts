// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
	production: false,
	urlLogin: "http://localhost:8080/login",
	urlGetPersonaByUsuario: "http://localhost:8080/getPersonaByUsuario",
	urlGetPersonaById: "http://localhost:8080/getPersonaById",
	urlGetPersonasByCliente: "http://localhost:8080/getPersonasByCliente",
	urlGetEstadosByPaciente: "http://localhost:8080/getEstadosByPaciente",
	urlGetEstadosByCliente: "http://localhost:8080/getEstadosByCliente",
	urlGetEstadosByPeticion: "http://localhost:8080/getEstadosByPeticion"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

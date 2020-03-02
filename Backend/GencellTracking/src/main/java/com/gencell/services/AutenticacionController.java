package com.gencell.services;

import gencell.authenticationservice.AuthenticationService;
import gencell.authenticationservice.AuthenticationService_Service;
import gencell.authenticationservice.UsuarioGencell;

public class AutenticacionController {
	public UsuarioGencell AutenticarTest(String usuario) {

        try { // Call Web Service Operation
            AuthenticationService_Service service = new AuthenticationService_Service();
            AuthenticationService port = service.getAuthenticationServicePort();
            UsuarioGencell result = port.authenticationTest(usuario);
            return result;

        } catch (Exception ex) {
            // TODO handle custom exceptions here
            return null;
        }
    }
    
    public UsuarioGencell autenticarGencellPharma(String usuario, String password) {

        try { // Call Web Service Operation
            AuthenticationService_Service service = new AuthenticationService_Service();
            AuthenticationService port = service.getAuthenticationServicePort();
            UsuarioGencell result = port.authenticationGencellPharma(usuario, password);
            return result;

        } catch (Exception ex) {
            // TODO handle custom exceptions here
            return null;
        }
    }

    public String generarTokenByUsuario(String usuario) {

        try { // Call Web Service Operation
            AuthenticationService_Service service = new AuthenticationService_Service();
            AuthenticationService port = service.getAuthenticationServicePort();
            String result = port.generarTokenByUsuario(usuario);
            return result;
        } catch (Exception ex) {
            return null;
        }
    }
}

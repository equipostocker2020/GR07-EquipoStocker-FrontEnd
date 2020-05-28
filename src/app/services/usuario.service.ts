//Importación de Paquetes
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
//modelo
import { Usuario } from '../models/usuario.models';
//config url
import { URL_SERVICIOS } from '../config/config';
//rxjs
import {filter, map, catchError} from 'rxjs/operators';
// sweetalert para retroalimentacion de errores.
import Swal from 'sweetalert2';
import { stringify } from 'querystring';



@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;

  constructor(
    public http: HttpClient,
    public router: Router
  ) {}
   /**
    *
    * @param usuario
    * Funcion que implementa el backend para crear usuarios
    * @author Stocker
    */
   crearUsuario( usuario: Usuario) {
     const url = URL_SERVICIOS + '/usuario' ;
     return this.http.post (url, usuario)
     .pipe(
      map( ( resp: any) => {
        Swal.fire('Usuario creado', usuario.email, 'success' );
        return resp.usuario;
      }),
      catchError ((err: any) => {
      console.log(err);
      console.log(err.error.errors.message);
      const errores = err.error.errors.message;
      Swal.fire('Error al registrarse', errores.substring(27) , 'error' );
      return  err.throw(err);
      }));
}

/**
 * 
 * @param id 
 * @param token 
 * @param usuario 
 * Funcion que se encarga de guardar parámetros en el localStorage
 * @author Stocker
 */
guardarStorage( id: string, token: string, usuario: Usuario ) {

  localStorage.setItem('id', id );
  localStorage.setItem('token', token );
  localStorage.setItem('usuario', JSON.stringify(usuario) );

  this.usuario = usuario;
  this.token = token;
}

/**
 * Función que se encarga de validar que exista token en el localStorage
 * Si existe lo trae y trae tambien los datos de usuario y los parsea a un JSON
 * Sino setea el token vacío y el usuario como nulo
 * @author Stocker
 */
cargarStorage(){
  if (localStorage.getItem('token')){
    this.token = localStorage.getItem('token');
    this.usuario = JSON.parse(localStorage.getItem('usuario'));
  } else {
    this.token = '';
    this.usuario = null;
  }
}

/**
 * 
 * @param usuario 
 * @param recordar 
 * Esta funcion valida si esta tildada la opcion recordar para mostrar en el front tu email
 * Se conecta con el backend a través del servicio de Login creando un observador
 * Y muestra respuestas con retro-alimentación al cliente
 * @author Stocker
 */
login( usuario: Usuario, recordar: boolean = false ) {

  if ( recordar ) {
    localStorage.setItem('email', usuario.email );
  }else {
    localStorage.removeItem('email');
  }

  const url = URL_SERVICIOS + '/login';
  return this.http.post( url, usuario )
            .pipe(
              map( (resp: any) => {
                this.guardarStorage( resp.id, resp.token, resp.usuario );
                console.log('respuesta servicio :' + resp);
                console.log(usuario);
                return true;
              }),
                catchError( (err: any) => {
                  console.log(err.error.mensaje);
                  Swal.fire('Error al ingresar', err.error.mensaje, 'error');

                  return err.throw(err);
              }));
}

/**
 * Valida que exista un token
 */
estaLogueado(){

  return (this.token.length > 5) ? true : false;
}

}

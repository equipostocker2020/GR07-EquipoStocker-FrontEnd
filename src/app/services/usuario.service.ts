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
         console.log(usuario);
         Swal.fire('Usuario creado', usuario.email, 'success' );
         console.log(resp);
         return resp.usuario;
       }),
       catchError ((err: any) => {
        console.log(err.error.errors.message);
        let errores = err.error.errors.message;
        Swal.fire('Error al registrarse', errores.substring(27) , 'error' );
        return  err.throw(err);
        }));
      }
      }




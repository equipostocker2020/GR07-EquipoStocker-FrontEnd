import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../models/cliente.models';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-actualizar-cliente',
  templateUrl: './actualizar-cliente.component.html',
  styles: [
  ]
})
export class ActualizarClienteComponent implements OnInit {

   token: string;
   cliente: Cliente;
   id:string;
  


  constructor(
    public _clienteService : ClienteService,
    public _usuarioService : UsuarioService,
    public router : Router,
    ) {
    this.cliente = this._clienteService.cliente;
    console.log(this.cliente);
    this._usuarioService.usuario;
     this.cargarStorage();
     this.guardarStorage(this._usuarioService.usuario._id, this._usuarioService.token, this.cliente);
    }

  ngOnInit(): void {

  }


  cargarStorage(){
    if (localStorage.getItem('token')){
      this.token = localStorage.getItem('token');
      this.cliente = JSON.parse(localStorage.getItem('cliente'));
    } else {
      this.token = '';
      this.cliente = null;
    }
  }

  guardarStorage( id: string,  token: string, cliente: Cliente ) {

    localStorage.setItem('id', this._usuarioService.usuario._id );
    localStorage.setItem('token', this._usuarioService.token );
    localStorage.setItem('cliente', JSON.stringify(cliente) );

    this.cliente = cliente;
    this.token = token;
    console.log(this.cliente);

  }


  guardar( cliente: Cliente){
      this.cliente.nombre = cliente.nombre;
      this.cliente.apellido = cliente.apellido;
      this.cliente.email = cliente.email;
      this.cliente.direccion = cliente.direccion;
      this.cliente.cuit = cliente.cuit;
      this.cliente.telefono = cliente.telefono;
      this.cliente.dni = cliente.dni;
      this._usuarioService.token = this.token;
      console.log(cliente);

      this._clienteService.actualizarCliente( this.cliente)
                  .subscribe( ( resp: any ) => {
                    this.router.navigate(['/clientes']);
                    console.log(resp);

                  });

  }

}

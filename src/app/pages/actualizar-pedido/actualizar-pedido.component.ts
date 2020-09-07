import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/services/producto.service';
import { Producto } from 'src/app/models/producto.models';
import { Cliente } from 'src/app/models/cliente.models';
import { ClienteService } from 'src/app/services/cliente.service';
import { Usuario } from 'src/app/models/usuario.models';
import { Router } from '@angular/router';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { PedidoService } from 'src/app/services/pedido.service';
import { Pedido } from 'src/app/models/pedido.models';
import { PedidosComponent } from '../pedidos/pedidos.component';

@Component({
  selector: 'app-actualizar-pedido',
  templateUrl: './actualizar-pedido.component.html',
  styleUrls: []
})
export class ActualizarPedidoComponent implements OnInit {

  token: string;
  pedido: Pedido;
  productos: Producto [] = [];
  clientes: Cliente [] = [];
  id: string;
  usuario: Usuario;
  precio:number;
  total:number;

  constructor(
    public _pedidoService: PedidoService,
    public _productoService: ProductoService,
    public _clienteService: ClienteService,
    public _usuarioService: UsuarioService,
    public router: Router,
    public _fileUpLoadService: FileUploadService
  ) {
    this.pedido = this._pedidoService.pedido;
    this._usuarioService.usuario;
    this.cargarStorage();
    this.guardarStorage(this._usuarioService.usuario._id, this._usuarioService.token, this.pedido);
  }

  ngOnInit(): void {
    this._productoService.cargarProductos()
    .subscribe((resp: any) => {
      this.productos = resp.productos;
    });

    this._clienteService.cargarCliente()
    .subscribe((resp: any) => {
      this.clientes = resp.clientes;
    });
   }

  cargarStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.pedido = JSON.parse(localStorage.getItem('pedido'));
    } else {
      this.token = '';
      this.pedido = null;
    }
  }

  guardarStorage(id: string, token: string, pedido: Pedido) {
    localStorage.setItem('id', this._usuarioService.usuario._id);
    localStorage.setItem('token', this._usuarioService.token);
    localStorage.setItem('pedido', JSON.stringify(pedido));
    this.pedido = pedido;
    this.token = token;
  }

  guardar(pedido: Pedido) {
    this.pedido.cliente = pedido.cliente;
    this.pedido.producto = pedido.producto;
    this.pedido.cantidad = pedido.cantidad;
    this.pedido.usuario = this._usuarioService.usuario;
    this._usuarioService.token = this.token;
    this._pedidoService.actualizarPedido(this.pedido)
      .subscribe((resp: any) => {
        this.router.navigate(['/pedidos']);
      });
  }


  eliminarStorage() {
    localStorage.removeItem('id');
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
  }

  muestraPrecio(id : string){
    this._productoService.cargarProductosPorID(id).subscribe((resp:any) =>{
      this.precio  = resp.productos.precio;
    });
  }

  muestraTotal(cantidad : number){
    this.total = cantidad * this.precio;
  }
}



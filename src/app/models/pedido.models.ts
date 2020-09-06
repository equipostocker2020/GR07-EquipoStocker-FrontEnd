import { Cliente } from './cliente.models';
import { Producto } from './producto.models';

export class Pedido {
    constructor(
        public cliente?:Cliente,
        public producto?: Producto,
        public cantidad?: Number,
        public estado?: String,
        public total?:Number,
        public numero_pedido?: String,
        public _id?: string,
    ){}

}

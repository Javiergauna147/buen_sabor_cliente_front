/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@angular/core';import { Producto } from '../Productos/productos.service';
import { ProductoCarrito } from '../localStorageManager/storageCarrito/storage-carrito.service';
;

@Injectable()
export class PedidosService { 
    constructor() {}

    async realizarNuevoPedido(productos:ProductoCarrito[]): Promise<CreatePedidoDto> {
        let bodyJson:string = JSON.stringify({
            cliente:"",
            estado:"pendiente",
            productos:productos.map((producto) => ({cantidad:producto.cantidad,producto:producto.id})),
            precio:0
        })
        return await (await fetch("http://localhost:3000/api/pedidio/create", {method:"POST",body:bodyJson})).json()
    }
}
interface ProductosDto {
    cantidad: number;
    producto: string;
}
  
export interface CreatePedidoDto {
    cliente: string;
    estado: string;
    productos: ProductosDto[];
    precio: number;
}
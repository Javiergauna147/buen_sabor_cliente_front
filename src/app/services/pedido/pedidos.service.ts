/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@angular/core';import { Producto } from '../Productos/productos.service';
import { ProductoCarrito } from '../localStorageManager/storageCarrito/storage-carrito.service';
import { Socket } from 'ngx-socket-io';
import { StorageUserService } from '../localStorageManager/storage-user.service';


@Injectable()
export class PedidosService { 
    constructor(private socket:Socket, private LSuserService:StorageUserService ) {}

    async realizarNuevoPedido(productos:ProductoCarrito[], adicionales:{envio:boolean, direccion:string, cupon:string}={envio:false, direccion:"", cupon:""}): Promise<PedidoResponseDto> {
        let bodyJson:string = JSON.stringify({
            productos:productos.map((producto) => ({cantidad:producto.cantidad,producto:producto.id})),
            precio:0,
            adicionales:{
                envio:{estado:adicionales.envio, direccion:adicionales.direccion},
                cupon:{estado:adicionales.cupon==""?false:true, codigo:adicionales.cupon}
            }
        })
        let response =(await window.fetchToken("http://localhost:3000/api/pedido/create", {method:"POST",headers:{
            "Content-Type":"application/json"
        },body:bodyJson}))
        if(response.ok!=true){
            throw new Error("Error al realizar el pedido")
        }
        return await response.json();
    }
    /*async seleccionPago(pedidoId:string, tipo:string): Promise<PedidoResponseDto>{
        await window.fetchToken("http://localhost:3000/api/pedido/"+pedidoId+"/pago/"+tipo, {method:"POST"})
    };*/

    async listaPedidos(): Promise<Pedido[]> {
        let response = await window.fetchToken("http://localhost:3000/api/pedido/find-all", {method:"GET"})
        return await response.json();
    }

    socketUpdatePedido(){
        let user = this.LSuserService.getItem();
        this.socket.removeAllListeners()
        return this.socket.fromEvent<string>(user.id +'_changeStatusPedido');
    }

    sendEventUpdatePedido(){
        let user = this.LSuserService.getItem();
        this.socket.emit('changeStatusPedido',user.id)
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

export interface Pedido{
        id: string,
        estado: string,
        productos: [
            {
                cantidad: number,
                producto: string,
                precio: number,
                id: string
            }
        ],
        precio: number,
        adicionales: {
            pago: {status: string, value: {medioSeleccionado:string|null, medios: {type:string, link:'',id:''}[]}},
        }
}

export interface PedidoResponseDto {
    pedido: Pedido;
    message: string
}
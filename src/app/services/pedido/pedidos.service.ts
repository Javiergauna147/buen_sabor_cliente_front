/*
https://docs.nestjs.com/providers#services
*/

import { Injectable, OnInit } from '@angular/core';import { Producto } from '../Productos/productos.service';
import { ProductoCarrito } from '../localStorageManager/storageCarrito/storage-carrito.service';
import { Socket } from 'ngx-socket-io';
import { StorageUserService } from '../localStorageManager/storage-user.service';
import { Observable } from 'rxjs';


@Injectable()
export class PedidosService implements OnInit { 
    constructor(private socket:Socket, private LSuserService:StorageUserService ) {}
    
    private eventObservable: Observable<{
        type: string;
        data: {
            user_cliente: string;
            pedido: string;
            nuevoEstado: string;
        };
    }> | null = null;
    private isLogged:boolean = false;

    ngOnInit(): void {
        if(this.LSuserService.getItem().id!="")
            this.sendLoginEvent();
    }

    async realizarNuevoPedido(productos:ProductoCarrito[], adicionales:{envio:boolean, direccion:string, cupon:string}={envio:false, direccion:"", cupon:""}): Promise<PedidoResponseDto> {
        if(this.LSuserService.getItem().id!="")
            this.sendLoginEvent();
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
        let pedido = await response.json();
        this.sendEventCreatedPedido((pedido).pedido.id);
        return pedido;
    }
    /*async seleccionPago(pedidoId:string, tipo:string): Promise<PedidoResponseDto>{
        await window.fetchToken("http://localhost:3000/api/pedido/"+pedidoId+"/pago/"+tipo, {method:"POST"})
    };*/

    async listaPedidos(): Promise<Pedido[]> {
        let response = await window.fetchToken("http://localhost:3000/api/pedido/find-all", {method:"GET"})
        if(this.LSuserService.getItem().id!="")
            this.sendLoginEvent();
        return await response.json();
    }

    socketUpdatePedido(){
        if(this.LSuserService.getItem().id!="")
            this.sendLoginEvent();
        if(this.eventObservable)
            return this.eventObservable;
        else{
            this.eventObservable = this.socket.fromEvent<{
                type: string,
                data: {
                    user_cliente: string,
                    pedido: string,
                    nuevoEstado: string
                }
            }>('pedido_update');
            return this.eventObservable;
        }
    }

    public sendEventCreatedPedido(pedido:string){
        let user = this.LSuserService.getItem();
        this.socket.emit('pedido',{
            "type": "pedido_update",
            "data": {
                "user_cliente": user.id,
                "pedido": pedido,
                "nuevoEstado": "EN PREPARACION"
            }
        })
    }

    sendLoginEvent(){
        if(!this.isLogged){
            let user = this.LSuserService.getItem();
            this.socket.emit('join',{
                "type":"join_cliente",
                "data":{
                    "user":user.id
                }
            })
            this.socket.fromEvent('disconnect').subscribe(()=>this.isLogged=false);
            this.isLogged = true;
        }
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
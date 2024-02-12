import { Component, OnInit } from '@angular/core';
import { CarritoService } from 'src/app/services/carrito/carrito.service';
import { Carrito } from 'src/app/services/localStorageManager/storageCarrito/storage-carrito.service';
import {CommonModule} from '@angular/common';
import { PedidosService } from 'src/app/services/pedido/pedidos.service';
@Component({
  standalone: true,
  selector: 'app-shop-carritoLateral',
  templateUrl: './carritoLateral.component.html',
  styleUrls: ['./carritoLateral.component.scss'],
  imports: [CommonModule]
})
export class CarritoLateral implements OnInit {
    constructor(public carritoService:CarritoService, public pedidoService: PedidosService) {}
    carrito: Carrito |null = {id:"",items:[]};

    ngOnInit(): void {
      this.carritoService.carritoUpdated.subscribe({
        next: (newCarrito:Carrito) => {
           this.carrito = newCarrito
        }
      });
      this.carritoService.carritoRefresh();
    }

    finalizarCompra(){
      this.pedidoService.realizarNuevoPedido(
        this.carrito!.items
      );
    }


}
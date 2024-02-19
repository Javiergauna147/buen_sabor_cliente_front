import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CarritoService } from 'src/app/services/carrito/carrito.service';
import { Carrito } from 'src/app/services/localStorageManager/storageCarrito/storage-carrito.service';
import {CommonModule} from '@angular/common';
import { Pedido, PedidosService } from 'src/app/services/pedido/pedidos.service';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ConfiguracionPagoPopUp } from '../../pago/configuracionPago';
@Component({
  standalone: true,
  selector: 'app-shop-carritoLateral',
  templateUrl: './carritoLateral.component.html',
  styleUrls: ['./carritoLateral.component.scss'],
  imports: [CommonModule]
})
export class CarritoLateral implements OnInit {
    constructor(public carritoService:CarritoService, public pedidoService: PedidosService, public messageService:MessageService,public dialogService: DialogService) {}
    carrito: Carrito |null = {id:"",items:[]};
    pedido!: Pedido | null;
    @Output() onFinalized: EventEmitter<String> = new EventEmitter<String>();

    ngOnInit(): void {
      this.carritoService.carritoUpdated.subscribe({
        next: (newCarrito:Carrito) => {
           this.carrito = newCarrito
        }
      });
      this.carritoService.carritoRefresh();
    }

    async finalizarCompra(){
      if(!this.carrito || this.carrito.items.length == 0){
        this.messageService.add({ severity: 'error', summary: 'Carrito vacio', detail: 'No se puede realizar un pedido sin productos' });
        return;
      }
      let pedido: any;
      const token = localStorage.getItem('token') || '';
      if(token == ''){
        this.messageService.add({ severity: 'error', summary: 'usuario no logueado', detail: 'No se pudo realizar el pedido' });
        return;
      }
      try{
        pedido = await this.pedidoService.realizarNuevoPedido(
        this.carrito!.items
      );
      }catch(e){
        this.messageService.add({ severity: 'error', summary: 'Error al realizar pedido', detail: 'No se pudo realizar el pedido' });
        return;
      }
      this.pedido= pedido.pedido
      
      this.show();
      this.carritoService.resetCarrito();
    }
    ref!: DynamicDialogRef;
    
    show() {
      this.ref = this.dialogService.open(ConfiguracionPagoPopUp, {
        header: 'Configurar Metodo De Pago',
        width: '80%',
        contentStyle: { 'max-height': '500px', overflow: 'auto' },
        baseZIndex: 10000,
        data: this.pedido
      });
      this.ref.onClose.subscribe((pedido:Pedido) => {
        this.pedido = pedido;
        if(pedido.adicionales.pago.value.medioSeleccionado == "enlocal"){
          this.messageService.add({ severity: 'success', summary: 'Pedido realizado', detail: 'El pedido se realizo correctamente' });
          this.onFinalized.emit(pedido.id);
          this.pedidoService.sendEventUpdatePedido();
        }
        else if(pedido.adicionales.pago.value.medioSeleccionado == "mp")
          this.messageService.add({ severity: 'success', summary: 'Pedido pendiente', detail: 'El pedido se realizo correctamente, pero falta el pago' });
      });
    }

    ngOnDestroy() {
      if (this.ref) {
        this.ref.close();
        this.pedido = null;
      }
    }
}
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { Pedido } from 'src/app/services/pedido/pedidos.service';

@Component({
  standalone: true,
  imports: [CommonModule],
  template: `<ul>
    <li *ngFor="let item of this.pedido.adicionales.pago.value.medios" >
        <a *ngIf="(item.type == 'mp')" [href]="(item.link)" target="_blank" (click)="seleccion(item.type)">mercado pago</a>
        <a *ngIf="(item.type == 'enlocal')" (click)="seleccion(item.type)">en local</a>
    </li>
  </ul>`
})
export class ConfiguracionPagoPopUp {

    public pedido!: Pedido;
  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {
    console.log(this.config.data)
    this.pedido = this.config.data;
  }

  ngOnInit() {
    this.pedido = this.config.data;
  }

  seleccion(medioDePago:string){
    console.log('metodo seleccionado:',medioDePago);
    this.pedido.adicionales.pago.value.medioSeleccionado = medioDePago;
    //this.pedido = this.pedidoService.seleccionPago(this.pedido.id, medioDePago);
    this.ref.close(this.pedido);
  }
}
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DirectivasModule } from 'src/app/components/directive/directiveModule';
import { Router } from '@angular/router';
import { CardModule } from 'primeng/card';
import { Pedido, PedidosService } from 'src/app/services/pedido/pedidos.service';
import { StepsModule } from 'primeng/steps';
import { MenuItem } from 'primeng/api';
declare global {
  interface Window {
    MercadoPago: any;
  }
}
@Component({
    selector: 'app-pedidos-page',
    standalone: true,
    template: `
    <div>
    <p-card *ngFor="let item of this.pedidos" [header]="item.id + ': ' + item.estado">
      <p-steps [model]="itemsPasos" [readonly]="true"></p-steps>
      <ul>
        <li *ngFor="let producto of item.productos">
          {{producto.producto}} x {{producto.cantidad}}
        </li>
      </ul>
      <p class="m-0">
        {{item.precio | currency}}
      </p>
    </p-card>
    </div>
  `,
    styleUrls: ['./pedidos-page.component.css'],
    imports: [
      CommonModule,
      DirectivasModule,
      CardModule,
      StepsModule
    ]
})
export class PedidoPageComponent implements OnInit{ 
  public pedidos: Pedido[] = [];
  public itemsPasos: MenuItem[];
  constructor(private router: Router, private pedidosService: PedidosService) {
    this.itemsPasos = [
      {label: 'Solicitado'},
      {label: 'Pago'},
      {label: 'Preparado'},
      {label: 'En camino'},
      {label: 'Entregado'}
    ];
  }
  
  ngOnInit(): void {
    this.pedidosService.listaPedidos().then((pedidoss) => {
      console.log(pedidoss);
      this.pedidos = pedidoss;
    });
  }
  
  
}

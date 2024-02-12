import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CarritoLateral } from "../../components/shared/carrito-lateral/carritoLateral.component";

@Component({
    selector: 'app-carrito-page',
    standalone: true,
    template: `
  <app-shop-carritoLateral></app-shop-carritoLateral>
  `,
    styleUrls: ['./carrito-page.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        CommonModule,
        CarritoLateral
    ]
})
export class CarritoPageComponent { }

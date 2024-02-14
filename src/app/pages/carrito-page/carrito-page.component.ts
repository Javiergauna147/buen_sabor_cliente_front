import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CarritoLateral } from "../../components/shared/carrito-lateral/carritoLateral.component";
import { DynamicScriptDirective } from 'src/app/components/directive/script-directive';
import { DirectivasModule } from 'src/app/components/directive/directiveModule';
import { Router } from '@angular/router';

declare global {
  interface Window {
    MercadoPago: any;
  }
}
@Component({
    selector: 'app-carrito-page',
    standalone: true,
    template: `
  <app-shop-carritoLateral (onFinalized)="this.onFinalized()"></app-shop-carritoLateral>
  `,
    styleUrls: ['./carrito-page.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
      CommonModule,
      CarritoLateral,
      DirectivasModule
    ]
})
export class CarritoPageComponent { 
  constructor(private router: Router) {}
  public isLoad(value:string){
    console.log('isLoad', value);
    const mp = new window.MercadoPago('');
    const bricksBuilder = mp.bricks();
  }
  public onFinalized(){
    console.log('change router');
    this.router.navigate(['/'])
  }
}

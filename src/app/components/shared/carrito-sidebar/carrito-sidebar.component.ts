import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { SidebarService } from 'src/app/services/carrito/sidebar.service';
import { CarritoService } from 'src/app/services/carrito/carrito.service';
import { Carrito } from 'src/app/services/localStorageManager/storageCarrito/storage-carrito.service';

@Component({
  selector: 'app-carrito-sidebar',
  templateUrl: './carrito-sidebar.component.html',
  styleUrls: ['./carrito-sidebar.component.scss']
})


export class CarritoSidebarComponent implements OnInit {
  mostrarSidebar = false;
  habilitarSidebar = true;
  carrito: Carrito | null = { id: "", items: [] };

  constructor(public  carritoService: CarritoService, private router: Router, private sidebarService: SidebarService) { }

  ngOnInit(): void {
    this.sidebarService.getSidebarVisibility().subscribe({
      next: mostrar => {
      this.mostrarSidebar = mostrar && this.habilitarSidebar;
    }});
    
    this.carritoService.carritoUpdated.subscribe({
      next: (newCarrito: Carrito) => {
        this.carrito = newCarrito
      }
    });
    this.carritoService.carritoRefresh();

  
    
    // Suscribirse a eventos de navegación para determinar si se debe mostrar el sidebar
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        console.log(this.router.url)
        this.habilitarSidebar = !this.router.url.includes('carrito');
      }
      this.sidebarService.setValue(false);
    });
  }



  finalizarCompra(): void {
    this.carritoService.finalizarCompra();
  }
}

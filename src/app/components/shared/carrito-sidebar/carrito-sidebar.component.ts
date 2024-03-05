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
  mostrarSidebar = true;
  carrito: Carrito | null = { id: "", items: [] };

  constructor(public  carritoService: CarritoService, private router: Router, private sidebarService: SidebarService) { }

  ngOnInit(): void {
    this.sidebarService.getSidebarVisibility().subscribe(mostrar => {
      this.mostrarSidebar = mostrar;
    });
    
    this.carritoService.carritoUpdated.subscribe({
      next: (newCarrito: Carrito) => {
        this.carrito = newCarrito
      }
    });
    this.carritoService.carritoRefresh();

  
    
    // Suscribirse a eventos de navegación para determinar si se debe mostrar el sidebar
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.mostrarSidebar = !this.router.url.includes('app-shop-carritoLateral');
      }
    });
  }



  finalizarCompra(): void {
    this.carritoService.finalizarCompra();
  }
}

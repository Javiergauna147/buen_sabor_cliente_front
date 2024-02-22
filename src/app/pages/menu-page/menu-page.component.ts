import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Producto, ProductosService } from 'src/app/services/Productos/productos.service';
import { CarritoService } from 'src/app/services/carrito/carrito.service';
import { Carrito } from 'src/app/services/localStorageManager/storageCarrito/storage-carrito.service';

@Component({
  selector: 'app-menu-page',
  templateUrl: './menu-page.component.html',
  styleUrls: ['./menu-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MenuPageComponent implements OnInit {


  productos: Producto[] = [];
  selectedProduct: any;
  showQuickViewFlag: boolean = false;

  constructor(private ProductoService: ProductosService, private CarritoService: CarritoService, private messageService: MessageService) { }

  ngOnInit(): void {
    console.log("MenuPageComponent");
    this.loadProductos();
    this.CarritoService.carritoUpdated.subscribe((newCarrito: Carrito) => {
      console.log(newCarrito);
    });
  }

  async loadProductos() {
    this.productos = await this.ProductoService.getAllProductosDisponibles();
  }

  selectProduct(event: Event,id: String) {
    event.stopPropagation(); // Detener la propagación del evento
    this.CarritoService.addItem(this.productos.find(producto => producto.id == id)!);
    this.messageService.add({ severity: 'success', summary: 'Producto agregado al carrito', detail: '' });
  }
  removeFromCart(id: String) {
    console.log('Producto eliminado del carrito ', this.productos.find(producto => producto.id == id)!);
    this.messageService.add({ severity: 'success', summary: 'Producto eliminado del carrito', detail: '' });
  }
  // Método para mostrar el "quick view"
  showQuickView(producto: any) {
    this.selectedProduct = producto;
    this.showQuickViewFlag = true;
  }

  hideQuickView() {
    this.showQuickViewFlag = false;
    this.selectedProduct = null;
}
}

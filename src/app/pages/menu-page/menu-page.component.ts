import { Component, OnInit } from '@angular/core';
import { Producto, ProductosService } from 'src/app/services/Productos/productos.service';
import { CarritoService } from 'src/app/services/carrito/carrito.service';
import { Carrito } from 'src/app/services/localStorageManager/storageCarrito/storage-carrito.service';

@Component({
  selector: 'app-menu-page',
  templateUrl: './menu-page.component.html',
  styleUrls: ['./menu-page.component.scss']
})
export class MenuPageComponent implements OnInit {


  productos: Producto[] = [];

  constructor(private ProductoService:ProductosService, private CarritoService:CarritoService) {
    
  }
 
  

  ngOnInit(): void {
    this.loadProductos();
    this.CarritoService.carritoUpdated.subscribe((newCarrito:Carrito) => {
      console.log(newCarrito);
    });
  }
  
  async loadProductos(){
    this.productos = await this.ProductoService.getAllProductosDisponibles();
  }

  selectProduct(id:String){
    this.CarritoService.addItem(this.productos.find(producto=>producto.id==id)!);
  }
}

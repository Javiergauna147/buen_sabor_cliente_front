import { Injectable } from '@angular/core';
import { Carrito, StorageCarritoService } from '../localStorageManager/storageCarrito/storage-carrito.service';
import { Producto } from '../Productos/productos.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  public carritoUpdated = new Subject<Carrito>();
  private finalizarCompraSubject: Subject<void> = new Subject<void>();
  finalizarCompra$ = this.finalizarCompraSubject.asObservable();
  
  constructor(private LSCarrito: StorageCarritoService) { 
    window.ServicesGetCarrito = ()=>this.getCarrito();
  }

  async addItem(producto:Producto){
    let carrito = this.LSCarrito.getItem();
    let item = carrito.items.find(item=>item.id==producto.id);
    if(item){
      item.cantidad++;
      item.subTotal = 0
    }else{
      carrito.items.push({...producto,cantidad:1,subTotal:0});
    }
    this.LSCarrito.setItem(carrito);
    this.calculateCarrito();
    this.carritoUpdated.next(this.LSCarrito.getItem());
  }

  async removeItem(producto:Producto){
    let carrito = this.LSCarrito.getItem();
    let item = carrito.items.find(item=>item.id==producto.id);
    if(item){
      item.cantidad--;
      if(item.cantidad==0){
        carrito.items = carrito.items.filter(item=>item.id!=producto.id);
      }
    }
    this.LSCarrito.setItem(carrito);
    this.calculateCarrito();
    this.carritoUpdated.next(this.LSCarrito.getItem());
  }

  async deleteItem(producto:Producto){
    let carrito = this.LSCarrito.getItem();
    carrito.items = carrito.items.filter(item=>item.id!=producto.id);
    this.LSCarrito.setItem(carrito);
    this.calculateCarrito();
    this.carritoUpdated.next(this.LSCarrito.getItem());
  }

  async resetCarrito(){
    this.carritoUpdated.next(this.LSCarrito.setItem({id:"",items:[]}));
  }

  getCarrito(): Carrito{
    return this.LSCarrito.getItem();
  }

  carritoRefresh(){
    this.carritoUpdated.next(this.LSCarrito.getItem());
  }
  async setCarrito(Carrito:Carrito){
    this.LSCarrito.setItem(Carrito);
  }

  public calculateCarrito(){
    let carrito = this.LSCarrito.getItem();
    let total = 0;
    carrito.items.forEach(item=>{
      item.subTotal = item.cantidad * Number(item.price);
      total += item.subTotal;
    });
    carrito.total = total;
    this.LSCarrito.setItem(carrito);
  }

  finalizarCompra(): void {
    this.finalizarCompraSubject.next();
  }
  
}

import { Injectable } from '@angular/core';
import { LocalStorageManagerService } from '../local-storage-manager.service';
import { Producto } from '../../Productos/productos.service';


export interface ProductoCarrito extends Producto {
  cantidad: number;
  subTotal: number;
}

export interface Carrito {
  id: string;
  items: ProductoCarrito[];
  total?: number;

}

@Injectable({
  providedIn: 'root'
})
export class StorageCarritoService extends LocalStorageManagerService<Carrito> {

  

  constructor() { 
    super("carrito");
  }


  override getItem(): Carrito {
    let item = super.getItem();
    return item? item:{id:"",items:[]};	
  }

}

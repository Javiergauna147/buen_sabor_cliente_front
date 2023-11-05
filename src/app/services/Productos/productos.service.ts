import { Injectable } from '@angular/core';
export interface Producto {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
}
@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor() { }


  async getAllProductosDisponibles(): Promise<Producto[]> {
    
    let data: any[] = await (await fetch("http://localhost:3000/api/producto-manufacturado/allDisponibles")).json()
    
    return data.map(a=>({id:a._id,name:a.name,description:a.description,price:a.precio,image:"https://img.freepik.com/foto-gratis/espaguetis-taza-negra-tomate-lechuga_1150-23167.jpg?size=626&ext=jpg"}));
  }
}

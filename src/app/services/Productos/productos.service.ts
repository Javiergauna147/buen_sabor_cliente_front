import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Producto {
  id: string;
  name: string;
  description: string;
  price: string;
  image: any;
}


@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  urlProductos: string = environment.API_BASE_ENDPOINT + '/producto-manufacturado';

  constructor(private http: HttpClient) { }

   getAllProductosDisponibles(): Observable<any> {
    return this.http.get<any>(`${this.urlProductos}/find-all`).pipe(
      map(
        (data) => {
          let payloadResponse: Producto[] = [];
          data.forEach((productoApiResponse: any) => {
            payloadResponse.push({id: productoApiResponse._id, name: productoApiResponse.nombre, description: productoApiResponse.descripcion, price: productoApiResponse.precio, image: productoApiResponse.imagen})
          });
          return payloadResponse;
        }
      )
    )
   }
}

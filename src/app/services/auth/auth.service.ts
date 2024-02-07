import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Usuario, UsuarioResponse } from './auth.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private tokenStorage = localStorage.getItem('token');
  private urlUsuario: string = environment.API_BASE_ENDPOINT + '/auth';

  constructor(private http: HttpClient) { }

  login(user: Usuario): Observable<UsuarioResponse>{
    return this.http.post<UsuarioResponse>(`${this.urlUsuario}/login`, user);
  }

  guardarToken(token: string) {
    localStorage.setItem('token', token);
  }

  createUser(user: Usuario): Observable<any>{
    return this.http.post<any>(`${this.urlUsuario}/create-user`, user);
  }

  obtenerToken(): string | null {
    return this.tokenStorage;
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Usuario, UsuarioResponse } from './auth.interface';
import { Observable } from 'rxjs';
import { StorageUserService } from '../localStorageManager/storage-user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private urlUsuario: string = environment.API_BASE_ENDPOINT + '/auth';

  constructor(private http: HttpClient, private LSuserService:StorageUserService) { }

  login(user: Usuario): Observable<UsuarioResponse>{
    return this.http.post<UsuarioResponse>(`${this.urlUsuario}/login`, user);
  }

  guardarToken(token: string, user: Usuario) {
    this.LSuserService.setItem({id: user._id!, name: "", email: user.email, token: token});
  }

  createUser(user: Usuario): Observable<any>{
    return this.http.post<any>(`${this.urlUsuario}/create-user`, user);
  }

  obtenerToken(): string | null {
    return (this.LSuserService.getItem().token)?this.LSuserService.getItem().token:null;
  }
}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private tokenLogin = ""
  private url = "http://localhost:3000"

  constructor() { }


  async sendLogin(email:String,password:String){
    await fetch(this.url + "/api/auth/login", {
      
    })
  }
}

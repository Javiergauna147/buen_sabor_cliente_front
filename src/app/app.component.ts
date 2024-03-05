import { Component, OnInit } from '@angular/core';
import { StorageUserService } from './services/localStorageManager/storage-user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  constructor(private LSuserService:StorageUserService) { 

  }

  ngOnInit(): void {
    window.fetchToken = (input: RequestInfo | URL, init?: RequestInit)=>fetch(input, {...init, headers: {...init?.headers, "Authorization": `Bearer ${this.LSuserService.getItem().token || ''}`}});
  }
  title = 'buen-sabor-cliente-front';
}
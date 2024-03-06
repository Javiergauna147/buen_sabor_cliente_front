import { Component, OnInit } from '@angular/core';
import { StorageUserService } from './services/localStorageManager/storage-user.service';
import { MessageService } from 'primeng/api';
import { PedidosService } from './services/pedido/pedidos.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  constructor(private LSuserService:StorageUserService, private messageService: MessageService, private pedidoService:PedidosService) { 

  }

  ngOnInit(): void {
    window.fetchToken = (input: RequestInfo | URL, init?: RequestInit)=>fetch(input, {...init, headers: {...init?.headers, "Authorization": `Bearer ${this.LSuserService.getItem().token || ''}`}});
    this.pedidoService.socketUpdatePedido().subscribe((event)=>{
      console.log(event);
      this.messageService.add({ severity: 'info', summary: 'Tu pedido se ha actualizado', detail: '' , life: 5000});
    });
  }
  title = 'buen-sabor-cliente-front';
}
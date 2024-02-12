import { Component, OnInit } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';

@Component({
  standalone: true,
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  imports: [
    MenubarModule
  ]
})

export class NavbarComponent implements OnInit {

  items: MenuItem[] = [];

  ngOnInit(): void {
    this.items = [
        {
            label: 'Menu',
            icon: 'pi pi-fw',
            routerLink: "/menu"
        },
      {
          label: 'Carta',
          icon: 'pi pi-fw',
          items: [
              {
                  label: 'Pizzas',
                  icon: 'pi pi-fw'
              },
              {
                  label: 'Ensaladas',
                  icon: 'pi pi-fw'
              }
          ]
      },
      {
        label: 'My Carrito',
        icon: 'pi pi-fw',
        routerLink: "/carrito"
        },
      {
          label: 'Perfil',
          icon: 'pi pi-fw',
          items: [
              {
                  label: 'Pedidos',
                  icon: 'pi pi-fw'
              }
          ]
      }
  ];
  }



}

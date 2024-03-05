import { Component, OnInit} from '@angular/core';
import { SidebarService } from 'src/app/services/carrito/sidebar.service';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { CarritoService } from 'src/app/services/carrito/carrito.service';
import { Carrito } from 'src/app/services/localStorageManager/storageCarrito/storage-carrito.service';


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
  cantidadItemsCarrito: number = 0;
  carritoVisible: boolean = false;

  constructor(private carritoService: CarritoService, private sidebarService: SidebarService ) {}
  
  carrito: Carrito |null = {id:"",items:[]};

  
//@ViewChild('sidebarCarrito') sidebarCarrito!: CarritoSidebarComponent;


  ngOnInit(): void {

    this.carritoService.carritoUpdated.subscribe({
      next: (newCarrito:Carrito) => {
         this.carrito = newCarrito;
         this.cantidadItemsCarrito = newCarrito.items.length;
         this.actualizarCantidadCarrito();
        }
    });


    this.items = [
        {
            label: 'Menu',
            icon: 'pi pi-home',
            routerLink: "/menu"
        },
      {
          label: 'Carta',
          icon: 'pi pi-list',
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
        icon: 'pi pi-shopping-cart',
        routerLink: "/carrito",
        badge: this.cantidadItemsCarrito.toString() // Utilizamos la propiedad badge para mostrar la cantidad de elementos en el carrito
        },
      {
          label: 'Perfil',
          icon: 'pi pi-user',
          items: [
              {
                  label: 'Pedidos',
                  icon: 'pi pi-fw',
                  routerLink: "/pedidos"
              }
          ]
      }
  ];

  }


 // Método para actualizar la propiedad badge del ítem de carrito en el menú
 private actualizarCantidadCarrito() {
  const carritoItem = this.items.find(item => item.label === 'My Carrito');
  if (carritoItem) {
    console.log(this.cantidadItemsCarrito.toString())
    carritoItem.badge = this.cantidadItemsCarrito.toString();
  }
}


toggleSidebar(): void {
  this.sidebarService.toggleSidebar();
}

}

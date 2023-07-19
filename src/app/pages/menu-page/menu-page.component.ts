import { Component } from '@angular/core';

@Component({
  selector: 'app-menu-page',
  templateUrl: './menu-page.component.html',
  styleUrls: ['./menu-page.component.scss']
})
export class MenuPageComponent {
  productos = [{
    id:"assddd",
    name:"",
    description:"aassddfaaa",
    price:"",
    image:""
  },
  {
    id:"hola",
    name:"",
    description:"otro",
    price:"",
    image:""
  }]


  selectProduct(id:String){
    /*agregar al carrito de compra*/
  }
}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { MenuPageComponent } from './pages/menu-page/menu-page.component';
import { CarritoPageComponent } from './pages/carrito-page/carrito-page.component';

const routes: Routes = [
  {
    path: 'login', component: LoginPageComponent,
  },
  {
    path: 'menu', component: MenuPageComponent,
  },
  {
    path: 'carrito', component: CarritoPageComponent,
  },
  {
    path: '**', component: MenuPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { StorageUserService } from './services/localStorageManager/storage-user.service';
import { PedidosService } from './services/pedido/pedidos.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { StyleClassModule } from 'primeng/styleclass';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TokenInterceptor } from './http-interceptors/token-interceptor';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { MenuPageComponent } from './pages/menu-page/menu-page.component';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { SidebarModule } from 'primeng/sidebar';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { CarritoSidebarComponent } from './components/shared/carrito-sidebar/carrito-sidebar.component';

const config: SocketIoConfig = { url: 'http://localhost:3000', options: {autoConnect:true} };


@NgModule({
  declarations: [
    AppComponent,
    MenuPageComponent,
    CarritoSidebarComponent,
  ],
  imports: [
    BrowserModule,
    SocketIoModule.forRoot(config),
    AppRoutingModule,
    BrowserAnimationsModule,
    StyleClassModule,
    ButtonModule,
    NavbarComponent,
    CardModule,
    CommonModule,
    DialogModule,
    ToastModule,
    RippleModule,
    HttpClientModule,
    DynamicDialogModule,
    SidebarModule,
    TableModule
  ],
  providers: [
    StorageUserService,
    PedidosService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    MessageService,
    DialogService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

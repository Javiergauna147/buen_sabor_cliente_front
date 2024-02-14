import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
declare global {
  interface Window {
    ServicesGetCarrito: () => any;
    fetchToken: (input: RequestInfo | URL, init?: RequestInit)=>Promise<Response>;
  }
}

window.fetchToken = (input: RequestInfo | URL, init?: RequestInit)=>fetch(input, {...init, headers: {...init?.headers, "Authorization": `Bearer ${localStorage.getItem("token") || ''}`}});

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

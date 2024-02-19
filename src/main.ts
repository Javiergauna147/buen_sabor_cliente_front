import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
declare global {
  interface Window {
    ServicesGetCarrito: () => any;
    fetchToken: (input: RequestInfo | URL, init?: RequestInit)=>Promise<Response>;
  }
}


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

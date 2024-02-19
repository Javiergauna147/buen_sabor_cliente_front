/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@angular/core';
import { LocalStorageManagerService } from './local-storage-manager.service';


interface UserL {
    id: string;
    name: string;
    email: string;
    token: string;
}

@Injectable({
    providedIn: 'root'
})
export class StorageUserService extends LocalStorageManagerService<UserL> {
    constructor() { 
        super("user");
      }
    
    
      override getItem(): UserL {
        let item = super.getItem();
        return item? item:{id:"",name:"",email:"",token:""};	
      }
}

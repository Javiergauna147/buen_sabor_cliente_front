import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  private mostrarSidebarSubject = new BehaviorSubject<boolean>(false);

  constructor() { }

  toggleSidebar(): void {
    const currentValue = this.mostrarSidebarSubject.getValue();
    this.mostrarSidebarSubject.next(!currentValue);
  }

  getSidebarVisibility(): Observable<boolean> {
    return this.mostrarSidebarSubject.asObservable();
  }
}

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarritoSidebarComponent } from './carrito-sidebar.component';

describe('CarritoSidebarComponent', () => {
  let component: CarritoSidebarComponent;
  let fixture: ComponentFixture<CarritoSidebarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarritoSidebarComponent]
    });
    fixture = TestBed.createComponent(CarritoSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

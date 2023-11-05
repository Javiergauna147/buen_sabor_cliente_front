import { TestBed } from '@angular/core/testing';

import { StorageCarritoService } from './storage-carrito.service';

describe('StorageCarritoService', () => {
  let service: StorageCarritoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorageCarritoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

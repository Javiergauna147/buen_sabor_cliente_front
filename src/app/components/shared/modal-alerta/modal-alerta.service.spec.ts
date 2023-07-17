import { TestBed } from '@angular/core/testing';

import { ModalAlertaService } from './modal-alerta.service';

describe('ModalAlertaService', () => {
  let service: ModalAlertaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalAlertaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

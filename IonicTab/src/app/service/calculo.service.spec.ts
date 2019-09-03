import { TestBed } from '@angular/core/testing';

import { CalculoService } from './calculo.service';

describe('CalculoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CalculoService = TestBed.get(CalculoService);
    expect(service).toBeTruthy();
  });
});

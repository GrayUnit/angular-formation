import { TestBed } from '@angular/core/testing';

import { ColOrdersService } from './col-orders.service';

describe('ColOrdersService', () => {
  let service: ColOrdersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ColOrdersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

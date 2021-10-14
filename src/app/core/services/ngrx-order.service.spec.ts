import { TestBed } from '@angular/core/testing';

import { NgrxOrderService } from './ngrx-order.service';

describe('NgrxOrderService', () => {
  let service: NgrxOrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgrxOrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

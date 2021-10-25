import { TestBed } from '@angular/core/testing';

import { ColClientsService } from './col-clients.service';

describe('ColClientsService', () => {
  let service: ColClientsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ColClientsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { UtilNumbersService } from './util-numbers.service';

describe('UtilNumbersService', () => {
  let service: UtilNumbersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UtilNumbersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { CommanserviceService } from './commanservice.service';

describe('CommanserviceService', () => {
  let service: CommanserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommanserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

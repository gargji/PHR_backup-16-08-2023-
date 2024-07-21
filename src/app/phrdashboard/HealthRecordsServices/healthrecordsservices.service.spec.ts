import { TestBed } from '@angular/core/testing';

import { HealthrecordsservicesService } from './healthrecordsservices.service';

describe('HealthrecordsservicesService', () => {
  let service: HealthrecordsservicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HealthrecordsservicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

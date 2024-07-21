import { TestBed } from '@angular/core/testing';

import { PatientSignaturesService } from './patient-signatures.service';

describe('PatientSignaturesService', () => {
  let service: PatientSignaturesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatientSignaturesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

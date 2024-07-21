import { TestBed } from '@angular/core/testing';
import { PatientMessageService } from './patient-message.service';

describe('PatientMessageService', () => {
  let service: PatientMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatientMessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

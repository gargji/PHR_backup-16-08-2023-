import { TestBed } from '@angular/core/testing';

import { MessagecenterService } from './messagecenter.service';

describe('MessagecenterService', () => {
  let service: MessagecenterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessagecenterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

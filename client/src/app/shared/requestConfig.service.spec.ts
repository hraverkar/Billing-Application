import { TestBed } from '@angular/core/testing';

import { RequestConfigService } from './request-config.service';

describe('RequestConfigService', () => {
  let service: RequestConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequestConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

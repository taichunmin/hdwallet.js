import { TestBed } from '@angular/core/testing';

import { DisabledStateService } from './disabled-state.service';

describe('DisabledState-Service', () => {
  let service: DisabledStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DisabledStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

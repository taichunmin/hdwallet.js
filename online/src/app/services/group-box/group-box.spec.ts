import { TestBed } from '@angular/core/testing';

import { GroupBoxService } from './group-box.service';

describe('GroupBox-Service', () => {
  let service: GroupBoxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GroupBoxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

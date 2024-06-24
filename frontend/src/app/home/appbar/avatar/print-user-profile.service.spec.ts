import { TestBed } from '@angular/core/testing';

import { PrintUserProfileService } from './print-user-profile.service';

describe('PrintAvatarService', () => {
  let service: PrintUserProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrintUserProfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

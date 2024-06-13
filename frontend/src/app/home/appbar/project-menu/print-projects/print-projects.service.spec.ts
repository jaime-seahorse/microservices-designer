import { TestBed } from '@angular/core/testing';

import { PrintProjectsService } from './print-projects.service';

describe('PrintProjectsService', () => {
  let service: PrintProjectsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrintProjectsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

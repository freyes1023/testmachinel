import { TestBed } from '@angular/core/testing';

import { ManagerFileService } from './manager-file.service';

describe('ManagerFileService', () => {
  let service: ManagerFileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManagerFileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

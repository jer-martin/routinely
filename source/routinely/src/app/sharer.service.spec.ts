import { TestBed } from '@angular/core/testing';

import { SharerService } from './sharer.service';

describe('SharerService', () => {
  let service: SharerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

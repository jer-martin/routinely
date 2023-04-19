import { TestBed } from '@angular/core/testing';

import { TabSwitchService } from './tab-switch.service';

describe('TabSwitchService', () => {
  let service: TabSwitchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TabSwitchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

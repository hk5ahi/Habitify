import { TestBed } from '@angular/core/testing';

import { CalenderDisplayService } from './calender-display.service';

describe('DisplayService', () => {
  let service: CalenderDisplayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalenderDisplayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

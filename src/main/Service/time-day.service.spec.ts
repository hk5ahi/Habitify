import { TestBed } from '@angular/core/testing';

import { TimeAndDayService } from './time-day.service';

describe('TimeDayService', () => {
  let service: TimeAndDayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimeAndDayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

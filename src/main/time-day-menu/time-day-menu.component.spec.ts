import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeDayMenuComponent } from './time-day-menu.component';

describe('TimeDayMenuComponent', () => {
  let component: TimeDayMenuComponent;
  let fixture: ComponentFixture<TimeDayMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TimeDayMenuComponent]
    });
    fixture = TestBed.createComponent(TimeDayMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

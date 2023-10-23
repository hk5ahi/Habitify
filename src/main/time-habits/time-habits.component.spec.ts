import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeHabitsComponent } from './time-habits.component';

describe('TimeHabitsComponent', () => {
  let component: TimeHabitsComponent;
  let fixture: ComponentFixture<TimeHabitsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TimeHabitsComponent]
    });
    fixture = TestBed.createComponent(TimeHabitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

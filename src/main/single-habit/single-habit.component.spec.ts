import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleHabitComponent } from './single-habit.component';

describe('SingleHabitComponent', () => {
  let component: SingleHabitComponent;
  let fixture: ComponentFixture<SingleHabitComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SingleHabitComponent]
    });
    fixture = TestBed.createComponent(SingleHabitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

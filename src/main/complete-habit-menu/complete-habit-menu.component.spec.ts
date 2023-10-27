import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteHabitMenuComponent } from './complete-habit-menu.component';

describe('CompleteHabitMenuComponent', () => {
  let component: CompleteHabitMenuComponent;
  let fixture: ComponentFixture<CompleteHabitMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompleteHabitMenuComponent]
    });
    fixture = TestBed.createComponent(CompleteHabitMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

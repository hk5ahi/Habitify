import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FailedHabitMenuComponent } from './failed-habit-menu.component';

describe('FailedHabitMenuComponent', () => {
  let component: FailedHabitMenuComponent;
  let fixture: ComponentFixture<FailedHabitMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FailedHabitMenuComponent]
    });
    fixture = TestBed.createComponent(FailedHabitMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

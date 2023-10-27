import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkipHabitMenuComponent } from './skip-habit-menu.component';

describe('SkipHabitMenuComponent', () => {
  let component: SkipHabitMenuComponent;
  let fixture: ComponentFixture<SkipHabitMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SkipHabitMenuComponent]
    });
    fixture = TestBed.createComponent(SkipHabitMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

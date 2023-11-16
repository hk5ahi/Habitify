import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HabitMenuComponent } from './habit-menu.component';

describe('HabitMenuComponent', () => {
  let component: HabitMenuComponent;
  let fixture: ComponentFixture<HabitMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HabitMenuComponent]
    });
    fixture = TestBed.createComponent(HabitMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

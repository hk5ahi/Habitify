import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditHabitMenuComponent } from './edit-habit-menu.component';

describe('EditHabitMenuComponent', () => {
  let component: EditHabitMenuComponent;
  let fixture: ComponentFixture<EditHabitMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditHabitMenuComponent]
    });
    fixture = TestBed.createComponent(EditHabitMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageHabitsComponent } from './manage-habits.component';

describe('ManageHabitsComponent', () => {
  let component: ManageHabitsComponent;
  let fixture: ComponentFixture<ManageHabitsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageHabitsComponent]
    });
    fixture = TestBed.createComponent(ManageHabitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

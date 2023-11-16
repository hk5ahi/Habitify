import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageHabitsSidebarComponent } from './manage-habits-sidebar.component';

describe('ManageHabitsComponent', () => {
  let component: ManageHabitsSidebarComponent;
  let fixture: ComponentFixture<ManageHabitsSidebarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageHabitsSidebarComponent]
    });
    fixture = TestBed.createComponent(ManageHabitsSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageHabitsNavbarComponent } from './manage-habits-navbar.component';

describe('ManageHabitsNavbarComponent', () => {
  let component: ManageHabitsNavbarComponent;
  let fixture: ComponentFixture<ManageHabitsNavbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageHabitsNavbarComponent]
    });
    fixture = TestBed.createComponent(ManageHabitsNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

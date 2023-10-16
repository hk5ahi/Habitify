import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HabitModalDialogueComponent } from './habit-modal-dialogue.component';

describe('HabitModalDialogueComponent', () => {
  let component: HabitModalDialogueComponent;
  let fixture: ComponentFixture<HabitModalDialogueComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HabitModalDialogueComponent]
    });
    fixture = TestBed.createComponent(HabitModalDialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

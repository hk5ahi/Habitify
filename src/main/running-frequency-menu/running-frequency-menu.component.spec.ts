import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RunningFrequencyMenuComponent } from './running-frequency-menu.component';

describe('RunningFrequencyMenuComponent', () => {
  let component: RunningFrequencyMenuComponent;
  let fixture: ComponentFixture<RunningFrequencyMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RunningFrequencyMenuComponent]
    });
    fixture = TestBed.createComponent(RunningFrequencyMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

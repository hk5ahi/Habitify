import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrequencyPeriodMenuComponent } from './frequency-period-menu.component';

describe('FrequencyPeriodMenuComponent', () => {
  let component: FrequencyPeriodMenuComponent;
  let fixture: ComponentFixture<FrequencyPeriodMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FrequencyPeriodMenuComponent]
    });
    fixture = TestBed.createComponent(FrequencyPeriodMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

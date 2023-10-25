import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrequencyMenuComponent } from './frequency-menu.component';

describe('FrequencyMenuComponent', () => {
  let component: FrequencyMenuComponent;
  let fixture: ComponentFixture<FrequencyMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FrequencyMenuComponent]
    });
    fixture = TestBed.createComponent(FrequencyMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

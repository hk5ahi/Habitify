import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaterFrequencyMenuComponent } from './water-frequency-menu.component';

describe('WaterFrequencyMenuComponent', () => {
  let component: WaterFrequencyMenuComponent;
  let fixture: ComponentFixture<WaterFrequencyMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WaterFrequencyMenuComponent]
    });
    fixture = TestBed.createComponent(WaterFrequencyMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

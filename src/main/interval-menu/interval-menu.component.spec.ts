import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntervalMenuComponent } from './interval-menu.component';

describe('IntervalMenuComponent', () => {
  let component: IntervalMenuComponent;
  let fixture: ComponentFixture<IntervalMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IntervalMenuComponent]
    });
    fixture = TestBed.createComponent(IntervalMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

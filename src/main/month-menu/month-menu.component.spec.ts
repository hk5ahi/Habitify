import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthMenuComponent } from './month-menu.component';

describe('MonthMenuComponent', () => {
  let component: MonthMenuComponent;
  let fixture: ComponentFixture<MonthMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MonthMenuComponent]
    });
    fixture = TestBed.createComponent(MonthMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

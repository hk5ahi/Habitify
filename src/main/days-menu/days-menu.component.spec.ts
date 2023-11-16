import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DaysMenuComponent } from './days-menu.component';

describe('DaysMenuComponent', () => {
  let component: DaysMenuComponent;
  let fixture: ComponentFixture<DaysMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DaysMenuComponent]
    });
    fixture = TestBed.createComponent(DaysMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

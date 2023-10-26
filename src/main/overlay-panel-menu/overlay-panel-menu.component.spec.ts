import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverlayPanelMenuComponent } from './overlay-panel-menu.component';

describe('OverlayPanelMenuComponent', () => {
  let component: OverlayPanelMenuComponent;
  let fixture: ComponentFixture<OverlayPanelMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OverlayPanelMenuComponent]
    });
    fixture = TestBed.createComponent(OverlayPanelMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

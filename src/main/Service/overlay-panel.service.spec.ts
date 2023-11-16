import { TestBed } from '@angular/core/testing';

import { OverlayPanelService } from './overlay-panel.service';

describe('OverlayPanelService', () => {
  let service: OverlayPanelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OverlayPanelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

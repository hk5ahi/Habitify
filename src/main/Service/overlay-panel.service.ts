import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OverlayPanelService {
  showPanel: boolean = false;
  event!: Event;

  sendEvent(event: Event): void {
    this.event = event;
  }

  getEvent(): Event {
    return this.event;
  }

  setShowPanelOverlay(bool: boolean): void {
    this.showPanel = bool;
  }

  getShowPanelOverlay(): boolean {
    return this.showPanel;
  }

}

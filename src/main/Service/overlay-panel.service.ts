import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class OverlayPanelService {
  showPanel!: boolean;
  private eventSubject = new Subject<Event>();
  event!:Event;

  sendEvent(event: Event): void {
    this.eventSubject.next(event);
    this.event = event;
    console.log(event);
  }

  // getEvent(): Subject<Event> {
  //   return this.eventSubject;
  // }
  getEvent(): Event {
    return this.event;
  }

  setShowPanelOverlay() {
    this.showPanel = true;
  }

}

import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor() { }
  private timeOfDay = new BehaviorSubject<string>(''); // Initial value can be set here

  timeOfDay$ = this.timeOfDay.asObservable();

  getTimeOfDay(): string {
    return this.timeOfDay.getValue();
  }

  setTimeOfDay(value: string) {
    this.timeOfDay.next(value);
  }
}

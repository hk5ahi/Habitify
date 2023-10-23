import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  private timeOfDay = new BehaviorSubject<string>(''); // Initial value can be set here
  timeOfDay$ = this.timeOfDay.asObservable();

  setTimeOfDay(value: string) {
    this.timeOfDay.next(value);
  }

  getTimeOfDayValue(): string {
    return this.timeOfDay.getValue();
  }
}

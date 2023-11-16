import { Injectable } from '@angular/core';
import { daysOfWeek, TimeOfDay } from "../Constants/app-constant";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TimeAndDayService {

  private timeOfDaySource = new BehaviorSubject<TimeOfDay[]>([TimeOfDay.Morning, TimeOfDay.Afternoon, TimeOfDay.Evening]);
  timeOfDay$ = this.timeOfDaySource.asObservable();
  private DaySource = new BehaviorSubject<string[]>([daysOfWeek.Sunday, daysOfWeek.Monday, daysOfWeek.Tuesday, daysOfWeek.Wednesday, daysOfWeek.Thursday, daysOfWeek.Friday, daysOfWeek.Saturday]);
  day$ = this.DaySource.asObservable();

  setTimeOfDay(timeOfDay: TimeOfDay[]) {
    this.timeOfDaySource.next(timeOfDay);
  }

  getTimeOfDay(): TimeOfDay[] {
    return this.timeOfDaySource.getValue();
  }

  setDay(day: string[]) {
    this.DaySource.next(day);
  }

}

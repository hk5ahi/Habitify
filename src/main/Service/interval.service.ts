import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { AppConstants, daysOfWeek, TimeOfDay } from "../Constants/app-constant";
import { Habit } from "../Data Types/habit";

@Injectable({
  providedIn: 'root'
})
export class IntervalService {

  private intervalPerDays = new BehaviorSubject<string>(AppConstants.repeat);
  private receivedHabitSource = new BehaviorSubject<Habit | null>(null);
  interval$ = this.intervalPerDays.asObservable();
  receivedHabit$ = this.receivedHabitSource.asObservable();

  setIntervalPerDays(interval: string) {
    this.intervalPerDays.next(interval);
  }
  setReceivedHabit(habit: Habit | null): void {
    this.receivedHabitSource.next(habit);
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { AppConstants } from "../Constants/app-constant";
import { Habit } from "../Data Types/habit";

@Injectable({
  providedIn: 'root'
})
export class IntervalService {

  private intervalPerDays = new BehaviorSubject<string>(AppConstants.repeat);
  interval$ = this.intervalPerDays.asObservable();
  private receivedHabitSource = new BehaviorSubject<Habit | null>(null);
  receivedHabit$ = this.receivedHabitSource.asObservable();

  setIntervalPerDays(interval: string) {
    this.intervalPerDays.next(interval);
  }

  setReceivedHabit(habit: Habit | null): void {
    this.receivedHabitSource.next(habit);
  }
}

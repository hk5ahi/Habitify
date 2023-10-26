import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { AppConstants } from "../Constants/app-constant";

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  manageSearchValue = new BehaviorSubject<string>('');
  searchValue$ = this.manageSearchValue.asObservable();
  habitSearchValue = new BehaviorSubject<string>('');
  habitSearchValue$ = this.habitSearchValue.asObservable();
  sortText = new BehaviorSubject<string>(AppConstants.habits_Order);
  sortText$ = this.sortText.asObservable();
  private timeOfDay = new BehaviorSubject<string>(''); // Initial value can be set here
  timeOfDay$ = this.timeOfDay.asObservable();

  setTimeOfDay(value: string) {
    this.timeOfDay.next(value);
  }

  getTimeOfDayValue(): string {
    return this.timeOfDay.getValue();
  }

  setSearchValue(value: string) {
    this.manageSearchValue.next(value);
  }

  setHabitSearchValue(value: string) {
    this.habitSearchValue.next(value);
  }
  setSortText(value: string) {
    this.sortText.next(value);
  }

}

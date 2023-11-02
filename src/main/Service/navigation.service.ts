import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { AppConstants } from "../Constants/app-constant";
import { DynamicDialogRef } from "primeng/dynamicdialog";

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
  selectedDate = new BehaviorSubject<Date>(new Date());
  selectedDate$ = this.selectedDate.asObservable();
  resizeNavigation = new BehaviorSubject<boolean>(false);
  resizeNavigation$ = this.resizeNavigation.asObservable();
  private timeOfDay = new BehaviorSubject<string>(''); // Initial value can be set here
  timeOfDay$ = this.timeOfDay.asObservable();
  private openDialogs: DynamicDialogRef[] = [];

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

  setSelectedDate(value: Date) {
    this.selectedDate.next(value);
  }

  getSelectedDateValue(): Date {
    return this.selectedDate.getValue();
  }

  getHabitSearchValue(): string {
    return this.habitSearchValue.getValue();
  }

  setResizeNavigation(value: boolean) {
    this.resizeNavigation.next(value);
  }

  getResizeNavigationValue(): boolean {
    return this.resizeNavigation.getValue();
  }

  addDialog(dialog: DynamicDialogRef) {
    this.openDialogs.push(dialog);
  }

  closeAllDialogs() {
    this.openDialogs.forEach((dialog) => {
      dialog.close();
    });
    this.openDialogs = [];
  }


}

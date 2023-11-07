import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { AppConstants } from "../Constants/app-constant";
import { DynamicDialogRef } from "primeng/dynamicdialog";

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  manageSearchValue = new BehaviorSubject<string>('');
  habitSearchValue = new BehaviorSubject<string>('');
  habitSearchValue$ = this.habitSearchValue.asObservable();
  sortText = new BehaviorSubject<string>(AppConstants.habits_Order);
  selectedDate = new BehaviorSubject<Date>(new Date());
  selectedDate$ = this.selectedDate.asObservable();
  resizeNavigation = new BehaviorSubject<boolean>(false);
  resizeNavigation$ = this.resizeNavigation.asObservable();
  isClickedOnDeleteDialogue = new BehaviorSubject<boolean>(false);
  isClickedOnDeleteDialogue$ = this.isClickedOnDeleteDialogue.asObservable();
  private timeOfDay = new BehaviorSubject<string>(''); // Initial value can be set here
  timeOfDay$ = this.timeOfDay.asObservable();
  private openDialogs = new Array<DynamicDialogRef>();

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

  addDialog(dialog: DynamicDialogRef) {
    this.openDialogs.push(dialog);
  }

  setResizeNavigation(value: boolean) {
    this.resizeNavigation.next(value);
  }

  closeAllDialogs() {
    this.openDialogs.forEach(dialog => {
      dialog.close();
    });
    this.openDialogs = [];
  }

  setIsClickedOnDeleteDialogue(value: boolean) {
    this.isClickedOnDeleteDialogue.next(value);
  }

}

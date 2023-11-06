import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  private isAllHabitsSubject = new BehaviorSubject<boolean>(false);
  isAllHabits$ = this.isAllHabitsSubject.asObservable();
  private isTimeHabitsSubject = new BehaviorSubject<boolean>(true);
  isTimeHabits$ = this.isTimeHabitsSubject.asObservable();
  private showManageHabitsSubject = new BehaviorSubject<boolean>(false);
  showManageHabits$ = this.showManageHabitsSubject.asObservable();

  updateIsAllHabits() {
    this.isAllHabitsSubject.next(true);
    this.isTimeHabitsSubject.next(false);
  }

  getIsAllHabitsValue(): boolean {
    return this.isAllHabitsSubject.getValue();
  }

  updateIsTimeHabits() {
    this.isAllHabitsSubject.next(false);
    this.isTimeHabitsSubject.next(true);
  }

  setIsTimeHabitsAndAllHabits(value: boolean) {
    this.isAllHabitsSubject.next(value);
    this.isTimeHabitsSubject.next(value);
  }

  getIsTimeHabitsValue(): boolean {
    return this.isTimeHabitsSubject.getValue();
  }

  setShowManageHabits(value: boolean) {
    this.showManageHabitsSubject.next(value);
  }

  getShowManageHabitsValue(): boolean {
    return this.showManageHabitsSubject.getValue();
  }
}

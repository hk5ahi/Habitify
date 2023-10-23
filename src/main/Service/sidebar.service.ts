import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  private isAllHabitsSubject = new BehaviorSubject<boolean>(true);
  isAllHabits$ = this.isAllHabitsSubject.asObservable();
  private isTimeHabitsSubject = new BehaviorSubject<boolean>(false);
  isTimeHabits$ = this.isTimeHabitsSubject.asObservable();

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
}

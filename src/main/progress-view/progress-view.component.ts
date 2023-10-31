import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Habit } from "../Data Types/habit";
import { HabitModalDialogueComponent } from "../habit-modal-dialogue/habit-modal-dialogue.component";
import { DialogService } from "primeng/dynamicdialog";
import { NavigationService } from "../Service/navigation.service";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-progress-view',
  templateUrl: './progress-view.component.html',
  styleUrls: ['./progress-view.component.scss']
})
export class ProgressViewComponent implements OnInit, OnDestroy {

  @Input() habit!: Habit;
  calenderData: string = this.getCurrentMonth();
  isResize!: boolean;
  resizeNavigationSubscription!: Subscription;

  constructor(private dialogService: DialogService, private navigationService: NavigationService) {
  }

  ngOnInit() {
    this.resizeNavigationSubscription = this.navigationService.resizeNavigation$.subscribe((data) => {
      this.isResize = data;
    });
  }

  getCurrentMonth(): string {
    const currentDate = new Date();
    const options: Intl.DateTimeFormatOptions = {month: 'long', year: 'numeric'};
    return currentDate.toLocaleDateString('en-US', options);
  }

  getCurrentYear(): string {
    const currentDate = new Date();
    return currentDate.getFullYear().toString();
  }

  openEditModal(habit: Habit) {
    this.dialogService.open(HabitModalDialogueComponent, {
      data: {
        habit: habit,
        editModal: true
      }
    });
  }

  updateCalenderData(currentMonth: string) {
    this.calenderData = currentMonth;
  }

  updateResizeNavigation() {
    this.isResize = !this.isResize;
    this.navigationService.setResizeNavigation(this.isResize);
  }

  getHabitCompletedStatus(habit: Habit): number {
    return habit.isCompleted ? 1 : 0;
  }

  getHabitFailedStatus(habit: Habit): number {
    return habit.isFailed ? 1 : 0;
  }

  getHabitSkippedStatus(habit: Habit): number {
    return habit.isSkipped ? 1 : 0;
  }

  getCurrentDate(): string {
    const currentDate = new Date();
    const options: Intl.DateTimeFormatOptions = {month: 'short', day: '2-digit', year: 'numeric'};
    return 'From ' + currentDate.toLocaleDateString('en-US', options);
  }

  ngOnDestroy(): void {
    if (this.resizeNavigationSubscription) {
      this.resizeNavigationSubscription.unsubscribe();
    }
  }
}

import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Habit } from "../Data Types/habit";
import { HabitModalDialogueComponent } from "../habit-modal-dialogue/habit-modal-dialogue.component";
import { DialogService } from "primeng/dynamicdialog";
import { NavigationService } from "../Service/navigation.service";
import { Subscription } from "rxjs";
import { AppConstants } from "../Constants/app-constant";
import { Title } from "@angular/platform-browser";

@Component({
  selector: 'app-progress-view',
  templateUrl: './progress-view.component.html',
  styleUrls: ['./progress-view.component.scss']
})
export class ProgressViewComponent implements OnInit, OnDestroy {

  @Input() habit!: Habit;
  calenderData: string = this.getCurrentMonth();
  isResize!: boolean;
  previousTitle!: string;
  resizeNavigationSubscription!: Subscription;

  constructor(private dialogService: DialogService, private navigationService: NavigationService, private titleService: Title) {
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

    if (this.isResize) {
      this.previousTitle = this.titleService.getTitle();
      this.titleService.setTitle(`${this.habit.name} - Habitify`);
    } else {
      this.titleService.setTitle(this.previousTitle);
    }
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
    return AppConstants.from + currentDate.toLocaleDateString('en-US', options);
  }

  getHabitGoalValue(habit: Habit) {
    if (habit.name == AppConstants.drinkWater) {
      return habit.goalProgress + " " + AppConstants.ml;
    } else if (habit.name == AppConstants.running || habit.name == AppConstants.cycling || habit.name == AppConstants.walk) {
      return habit.goalProgress + " " + AppConstants.kM;
    } else {
      return habit.goalProgress + " " + AppConstants.times;
    }
  }

  ngOnDestroy(): void {
    if (this.resizeNavigationSubscription) {
      this.resizeNavigationSubscription.unsubscribe();
    }
  }

}

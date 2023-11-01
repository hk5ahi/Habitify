import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { DialogService } from "primeng/dynamicdialog";
import { HabitModalDialogueComponent } from "../habit-modal-dialogue/habit-modal-dialogue.component";
import { activeTabIndices } from "../Constants/app-constant";
import { HabitService } from "../Service/habit.service";
import { Habit } from "../Data Types/habit";
import { NavigationService } from "../Service/navigation.service";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-habits',
  templateUrl: './habits.component.html',
  styleUrls: ['./habits.component.scss']
})
export class HabitsComponent implements OnInit, OnDestroy {

  @Input() habits: Habit[] = [];
  @Input() habit!: Habit;
  showEmpty = false;
  isResize!: boolean;
  selectDateSubscription!: Subscription;
  resizeNavigationSubscription!: Subscription;
  habitsSubscription!: Subscription;
  protected readonly activeTabIndices = activeTabIndices;

  constructor(private dialogService: DialogService, private habitService: HabitService, private navService: NavigationService) {
  }

  ngOnInit(): void {
    this.selectDateSubscription = this.navService.selectedDate$.subscribe((date: Date) => {
      this.sendHabits();
    });
    this.resizeNavigationSubscription = this.navService.resizeNavigation$.subscribe((isResize: boolean) => {
      this.isResize = isResize;
    });
  }

  hasHabits(): boolean {
    return this.habitService.hasHabits(this.habits);
  }

  openDialog(): void {
    this.dialogService.open(HabitModalDialogueComponent, {});
  }

  isHabitCompleted(): boolean {
    // Assuming habits is an array of Habit objects
    return this.habitService.isHabitsCompleted(this.habits);
  }

  getCompletedHabitsCount(): number {
    return this.habitService.getCompletedHabitsCount(this.habits);
  }

  getSkippedHabitsCount(): number {
    // Assuming habits is an array of Habit objects
    return this.habitService.getSkippedHabitsCount(this.habits);
  }

  getFailedHabitsCount(): number {
    // Assuming habits is an array of Habit objects
    return this.habitService.getFailedHabitsCount(this.habits);
  }

  getSuccessHeader(): string {
    return `${this.getCompletedHabitsCount()} Success`;
  }

  getSkipHeader() {
    return `${this.getSkippedHabitsCount()} Skip`;
  }

  isHabitSkipped() {
    return this.habitService.isHabitsSkipped(this.habits);
  }

  getFailHeader() {
    return `${this.getFailedHabitsCount()} Fail`;
  }

  isHabitFailed() {
    return this.habitService.isHabitsFailed(this.habits);
  }

  sendCompletedHabits() {
    return this.habitService.sendCompletedHabits(this.habits);
  }

  sendSkippedHabits() {
    return this.habitService.sendSkippedHabits(this.habits);
  }

  sendFailedHabits() {
    return this.habitService.sendFailedHabits(this.habits);
  }

  sendHabits(): Habit[] {
    return this.habitService.sendHabits(this.habits);
  }

  ngOnDestroy(): void {
    if (this.selectDateSubscription) {
      this.selectDateSubscription.unsubscribe();
    }
    if (this.resizeNavigationSubscription) {
      this.resizeNavigationSubscription.unsubscribe();
    }
  }

}

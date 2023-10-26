import { Component, Input } from '@angular/core';
import { Habit } from "../Data Types/habit";
import { DialogService } from "primeng/dynamicdialog";
import { HabitModalDialogueComponent } from "../habit-modal-dialogue/habit-modal-dialogue.component";
import { activeTabIndices } from "../Constants/app-constant";

@Component({
  selector: 'app-habits',
  templateUrl: './habits.component.html',
  styleUrls: ['./habits.component.scss']
})
export class HabitsComponent {

  @Input() habits: Habit[] = [];
  showEmpty = false;
  protected readonly activeTabIndices = activeTabIndices;

  constructor(private dialogService: DialogService) {
  }

  hasHabits(): boolean {
    return this.habits.length > 0;
  }

  openDialog(): void {
    this.dialogService.open(HabitModalDialogueComponent, {});
  }

  isHabitCompleted(): boolean {
    // Assuming habits is an array of Habit objects
    return this.habits.some(habit => habit.isCompleted);
  }

  getCompletedHabitsCount(): number {
    return this.habits.filter(habit => habit.isCompleted).length;
  }

  getSkippedHabitsCount(): number {

    return this.habits.filter(habit => habit.isSkipped).length;
  }

  getFailedHabitsCount(): number {
    // Assuming habits is an array of Habit objects
    return this.habits.filter(habit => habit.isFailed).length;
  }

  getSuccessHeader(): string {
    return `${this.getCompletedHabitsCount()} Success`;
  }

  getSkipHeader() {
    return `${this.getSkippedHabitsCount()} Skip`;
  }

  isHabitSkipped() {
    return this.habits.some(habit => habit.isSkipped);
  }

  getFailHeader() {
    return `${this.getFailedHabitsCount()} Fail`;
  }

  isHabitFailed() {
    return this.habits.some(habit => habit.isFailed);
  }

  sendCompletedHabits() {
    return this.habits.filter(habit => habit.isCompleted);
  }

  sendSkippedHabits() {
    return this.habits.filter(habit => habit.isSkipped);
  }

  sendFailedHabits() {
    return this.habits.filter(habit => habit.isFailed);
  }

  sendHabits(): Habit[] {
    return this.habits.filter(habit => !habit.isCompleted && !habit.isSkipped && !habit.isFailed);
  }

  // display empty habit when search does not match any habit
  showEmptyHabit(value: boolean) {
    this.showEmpty = value;
  }


}

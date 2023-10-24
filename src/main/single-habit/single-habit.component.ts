import { Component, Input, ViewChild } from '@angular/core';
import { HabitService } from "../Service/habit.service";
import { Habit } from "../Data Types/habit";
import { AppConstants, iconMap } from "../Constants/app-constant";
import { HabitModalDialogueComponent } from "../habit-modal-dialogue/habit-modal-dialogue.component";
import { DialogService } from "primeng/dynamicdialog";
import { MatMenuTrigger } from "@angular/material/menu";

@Component({
  selector: 'app-single-habit',
  templateUrl: './single-habit.component.html',
  styleUrls: ['./single-habit.component.scss']
})
export class SingleHabitComponent {
  @ViewChild(MatMenuTrigger) editHabitTrigger!: MatMenuTrigger;
  @Input() habits: Habit[] = [];
  protected readonly AppConstants = AppConstants;

  constructor(private habitService: HabitService, private dialogService: DialogService) {
  }

  getHabitIcon(habit: Habit): string {
    return iconMap[habit.name] || 'assets/svg/mark.svg';
  }

  openEditHabitMenu(event: MouseEvent) {
    event.preventDefault();
    this.editHabitTrigger.openMenu();
  }

  openEditModal(habit: Habit) {

    this.dialogService.open(HabitModalDialogueComponent, {
      data: {
        habit: habit,
        editModal: true
      }
    });
  }

  completeHabit(habit: Habit) {
    this.habitService.toggleCompleteHabit(habit, true);
  }

  undoComplete(habit: Habit) {
    this.habitService.toggleCompleteHabit(habit, false);
  }

  skipHabit(habit: Habit) {
    this.habitService.toggleSkipHabit(habit, true);
  }

  failHabit(habit: Habit) {
    this.habitService.toggleFailHabit(habit, true);
  }

  undoFailHabit(habit: Habit) {
    this.habitService.toggleFailHabit(habit, false);
  }

  undoSkip(habit: Habit) {
    this.habitService.toggleSkipHabit(habit, false);
  }

  getSingleNumber(habit: Habit): number {
    if (habit.isCompleted) {
      return 1;
    } else {
      return 0;
    }
  }

  showDoneButton(habit: Habit) {
    return (!habit.isCompleted && !habit.isSkipped && !habit.isFailed) && (habit.name != AppConstants.cycling && habit.name != AppConstants.running);
  }

  toggleLogValueBar(habit: Habit) {
    this.habitService.toggleLogValueBar();
    habit.showLogValueBar = true;
  }


  showLogButton(habit: Habit) {
    return !habit.showLogValueBar && (habit.name == AppConstants.cycling || habit.name == AppConstants.running);
  }

  closeLogValueBar(habit: Habit) {
    habit.showLogValueBar = false;
  }

}

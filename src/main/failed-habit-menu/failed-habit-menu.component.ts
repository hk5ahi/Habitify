import { Component, Input, ViewChild } from '@angular/core';
import { Habit } from "../Data Types/habit";
import { HabitModalDialogueComponent } from "../habit-modal-dialogue/habit-modal-dialogue.component";
import { DialogService } from "primeng/dynamicdialog";
import { HabitService } from "../Service/habit.service";
import { MatMenu } from "@angular/material/menu";
import { AppConstants } from "../Constants/app-constant";
import { OverlayPanel } from "primeng/overlaypanel";

@Component({
  selector: 'app-failed-habit-menu',
  templateUrl: './failed-habit-menu.component.html',
  styleUrls: ['./failed-habit-menu.component.scss']
})
export class FailedHabitMenuComponent {

  @ViewChild(MatMenu) menu!: MatMenu;
  @Input() habit!: Habit;
  @ViewChild('overlayPanel') overlayPanel!: OverlayPanel;
  progressData!: string;

  constructor(private habitService: HabitService, private dialogService: DialogService) {
  }

  getMenu(): MatMenu {
    return this.menu;
  }
  showOverlayPanel(event: Event, habit: Habit) {
    this.overlayPanel.show(event);
    if (habit.name == AppConstants.cycling || habit.name == AppConstants.running) {
      this.progressData = AppConstants.runningFrequency;
    } else {
      this.progressData = AppConstants.Times;
    }
  }
  openEditModal(habit: Habit) {
    this.dialogService.open(HabitModalDialogueComponent, {
      data: {
        habit: habit,
        editModal: true
      }
    });
  }

  undoFailHabit(habit: Habit) {
    this.habitService.toggleFailHabit(habit, false);
  }

}

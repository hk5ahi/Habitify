import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Habit } from "../Data Types/habit";
import { HabitModalDialogueComponent } from "../habit-modal-dialogue/habit-modal-dialogue.component";
import { DialogService } from "primeng/dynamicdialog";
import { HabitService } from "../Service/habit.service";
import { MatMenu } from "@angular/material/menu";
import { OverlayPanelService } from "../Service/overlay-panel.service";

@Component({
  selector: 'app-complete-habit-menu',
  templateUrl: './complete-habit-menu.component.html',
  styleUrls: ['./complete-habit-menu.component.scss']
})
export class CompleteHabitMenuComponent {

  @ViewChild(MatMenu) menu!: MatMenu;
  @Input() habit!: Habit;
  @Output() habitProgress = new EventEmitter<Habit>();

  constructor(private habitService: HabitService, private dialogService: DialogService, private overlayPanelService: OverlayPanelService) {
  }

  getMenu(): MatMenu {
    return this.menu;
  }

  openEditModal(habit: Habit) {
    this.dialogService.open(HabitModalDialogueComponent, {
      data: {
        habit: habit,
        editModal: true
      }
    });
  }

  undoComplete(habit: Habit) {
    this.habitService.toggleCompleteHabit(habit, false);
  }

  showOverlayPanel(event: Event, habit: Habit) {
    this.overlayPanelService.setShowPanelOverlay(true);
    this.overlayPanelService.sendEvent(event);
    habit.showOverLayPanel = true;
  }

  emitHabit(habit: Habit) {
    this.habitProgress.emit(habit);
  }

}

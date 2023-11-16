import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Habit } from "../Data Types/habit";
import { HabitModalDialogueComponent } from "../habit-modal-dialogue/habit-modal-dialogue.component";
import { DialogService } from "primeng/dynamicdialog";
import { HabitService } from "../Service/habit.service";
import { MatMenu } from "@angular/material/menu";
import { OverlayPanelService } from "../Service/overlay-panel.service";

@Component({
  selector: 'app-failed-habit-menu',
  templateUrl: './failed-habit-menu.component.html',
  styleUrls: ['./failed-habit-menu.component.scss']
})
export class FailedHabitMenuComponent {

  @ViewChild(MatMenu) menu!: MatMenu;
  @Input() habit!: Habit;
  @Output() habitProgress = new EventEmitter<Habit>();

  constructor(private habitService: HabitService, private dialogService: DialogService, private overlayPanelService: OverlayPanelService) {
  }

  getMenu(): MatMenu {
    return this.menu;
  }

  showOverlayPanel(event: Event, habit: Habit) {
    this.overlayPanelService.setShowPanelOverlay(true);
    this.overlayPanelService.sendEvent(event);
    habit.showOverLayPanel = true;
  }

  openEditModal(habit: Habit) {
    this.dialogService.open(HabitModalDialogueComponent, {
      data: {
        habit: habit,
        editModal: true
      }
    });
  }

  emitHabit(habit: Habit) {
    this.habitProgress.emit(habit);
  }

  undoFailHabit(habit: Habit) {
    this.habitService.toggleFailHabit(habit, false);
  }
}

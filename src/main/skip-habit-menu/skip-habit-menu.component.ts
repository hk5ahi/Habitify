import { Component, Input, ViewChild } from '@angular/core';
import { Habit } from "../Data Types/habit";
import { OverlayPanelService } from "../Service/overlay-panel.service";
import { DialogService } from "primeng/dynamicdialog";
import { HabitService } from "../Service/habit.service";
import { HabitModalDialogueComponent } from "../habit-modal-dialogue/habit-modal-dialogue.component";
import { MatMenu } from "@angular/material/menu";

@Component({
  selector: 'app-skip-habit-menu',
  templateUrl: './skip-habit-menu.component.html',
  styleUrls: ['./skip-habit-menu.component.scss']
})
export class SkipHabitMenuComponent {

  @ViewChild(MatMenu) menu!: MatMenu;
  @Input() habit!: Habit;

  constructor(private habitService: HabitService, private dialogService: DialogService, private overlayPanelService: OverlayPanelService) {
  }

  undoSkip(habit: Habit) {
    this.habitService.toggleSkipHabit(habit, false);
  }

  openEditModal(habit: Habit) {
    this.dialogService.open(HabitModalDialogueComponent, {
      data: {
        habit: habit,
        editModal: true
      }
    });
  }

  showOverlayPanel(event: Event, habit: Habit) {
    this.overlayPanelService.setShowPanelOverlay(true);
    this.overlayPanelService.sendEvent(event);
    habit.showOverLayPanel = true;
  }

  getMenu(): MatMenu {
    return this.menu;
  }

}

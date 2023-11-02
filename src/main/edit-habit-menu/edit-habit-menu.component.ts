import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Habit } from "../Data Types/habit";
import { HabitService } from "../Service/habit.service";
import { HabitModalDialogueComponent } from "../habit-modal-dialogue/habit-modal-dialogue.component";
import { DialogService } from "primeng/dynamicdialog";
import { OverlayPanel } from "primeng/overlaypanel";
import { MatMenu } from "@angular/material/menu";
import { OverlayPanelService } from "../Service/overlay-panel.service";

@Component({
  selector: 'app-edit-habit-menu',
  templateUrl: './edit-habit-menu.component.html',
  styleUrls: ['./edit-habit-menu.component.scss']
})
export class EditHabitMenuComponent {

  @ViewChild('calendar') calender!: ElementRef;
  @Input() habit!: Habit;
  @ViewChild(MatMenu) menu!: MatMenu;
  @ViewChild('overlayPanel') overlayPanel!: OverlayPanel;
  @Output() habitProgress = new EventEmitter<Habit>();
  @Output() isOverlay = new EventEmitter<boolean>();

  constructor(private habitService: HabitService, private dialogService: DialogService, private overlayPanelService: OverlayPanelService) {
  }

  getMenu(): MatMenu {
    return this.menu;
  }

  completeHabit(habit: Habit) {
    this.habitService.toggleCompleteHabit(habit, true);
  }

  skipHabit(habit: Habit) {
    this.habitService.toggleSkipHabit(habit, true);
  }

  failHabit(habit: Habit) {
    this.habitService.toggleFailHabit(habit, true);
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

  emitHabit(habit: Habit) {
    this.habitProgress.emit(habit);
  }

  emitIsOverlay(isOverlay: boolean) {
    this.isOverlay.emit(isOverlay);
  }
}

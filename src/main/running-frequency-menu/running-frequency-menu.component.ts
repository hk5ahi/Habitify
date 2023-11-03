import { Component, ElementRef, EventEmitter, HostListener, Output, ViewChild } from '@angular/core';
import { MatMenu } from "@angular/material/menu";

@Component({
  selector: 'app-running-frequency-menu',
  templateUrl: './running-frequency-menu.component.html',
  styleUrls: ['./running-frequency-menu.component.scss']
})
export class RunningFrequencyMenuComponent {
  @Output() runningGoal: EventEmitter<string> = new EventEmitter<string>();
  @ViewChild(MatMenu) menu!: MatMenu;
  @Output() habitItemSelected: EventEmitter<boolean> = new EventEmitter<boolean>();
  @ViewChild('run') editHabit!: ElementRef;
  getMenu(): MatMenu {
    return this.menu;
  }

  updateRunningGoalFrequency(times: string) {
    this.runningGoal.emit(times);
  }
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    const isHabitDialogClick = this.editHabit?.nativeElement?.contains(event.target);

    if (isHabitDialogClick) {

      this.habitItemSelected.emit(true);
    }
    else {
      this.habitItemSelected.emit(false);
    }
  }

}

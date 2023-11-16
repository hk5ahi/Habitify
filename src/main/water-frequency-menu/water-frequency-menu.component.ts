import { Component, ElementRef, EventEmitter, HostListener, Output, ViewChild } from '@angular/core';
import { MatMenu } from "@angular/material/menu";

@Component({
  selector: 'app-water-frequency-menu',
  templateUrl: './water-frequency-menu.component.html',
  styleUrls: ['./water-frequency-menu.component.scss']
})
export class WaterFrequencyMenuComponent {
  @Output() waterGoal: EventEmitter<string> = new EventEmitter<string>();
  @ViewChild(MatMenu) menu!: MatMenu;
  @Output() habitItemSelected: EventEmitter<boolean> = new EventEmitter<boolean>();
  @ViewChild('water') editHabit!: ElementRef;

  updateWaterGoalFrequency(times: string) {
    this.waterGoal.emit(times);
  }

  getMenu(): MatMenu {
    return this.menu;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    const isHabitDialogClick = this.editHabit?.nativeElement?.contains(event.target);

    if (isHabitDialogClick) {
      this.habitItemSelected.emit(true);
    } else {
      this.habitItemSelected.emit(false);
    }
  }

}

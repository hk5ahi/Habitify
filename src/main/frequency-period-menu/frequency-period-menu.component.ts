import { Component, ElementRef, EventEmitter, HostListener, Output, ViewChild } from '@angular/core';
import { MatMenu } from "@angular/material/menu";

@Component({
  selector: 'app-frequency-period-menu',
  templateUrl: './frequency-period-menu.component.html',
  styleUrls: ['./frequency-period-menu.component.scss']
})
export class FrequencyPeriodMenuComponent {
  @Output() frequencyPeriod: EventEmitter<string> = new EventEmitter<string>();
  @ViewChild(MatMenu) menu!: MatMenu;
  @Output() habitItemSelected: EventEmitter<boolean> = new EventEmitter<boolean>();
  @ViewChild('period') editHabit!: ElementRef;

  getMenu(): MatMenu {
    return this.menu;
  }

  updateFrequencyPeriod(perWeek: string) {
    this.frequencyPeriod.emit(perWeek);
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

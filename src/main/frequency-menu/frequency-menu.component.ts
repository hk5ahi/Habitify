import { Component, ElementRef, EventEmitter, HostListener, Output, ViewChild } from '@angular/core';
import { MatMenu } from "@angular/material/menu";

@Component({
  selector: 'app-frequency-menu',
  templateUrl: './frequency-menu.component.html',
  styleUrls: ['./frequency-menu.component.scss']
})
export class FrequencyMenuComponent {
  @Output() frequency: EventEmitter<string> = new EventEmitter<string>();
  @Output() habitItemSelected: EventEmitter<boolean> = new EventEmitter<boolean>();
  @ViewChild('days') editHabit!: ElementRef;
  @ViewChild(MatMenu) menu!: MatMenu;

  getMenu(): MatMenu {
    return this.menu;
  }
  updateGoalFrequency(times: string) {
    this.frequency.emit(times);
  }
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    const isHabitDialogClick = this.editHabit?.nativeElement?.contains(event.target);

    if (isHabitDialogClick) {
      this.habitItemSelected.emit(true);
    }
    else {
    this.habitItemSelected.emit(false);}
  }
}

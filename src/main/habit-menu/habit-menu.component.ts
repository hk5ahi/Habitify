import { Component, ElementRef, EventEmitter, HostListener, Output, ViewChild } from '@angular/core';
import { MatMenu, MatMenuTrigger } from "@angular/material/menu";

@Component({
  selector: 'app-habit-menu',
  templateUrl: './habit-menu.component.html',
  styleUrls: ['./habit-menu.component.scss']
})
export class HabitMenuComponent {

  @Output() habit: EventEmitter<string> = new EventEmitter<string>();
  @Output() habitItemSelected: EventEmitter<boolean> = new EventEmitter<boolean>();
  @ViewChild(MatMenu) menu!: MatMenu;
  @ViewChild('section') editHabit!: ElementRef;
  @ViewChild(MatMenuTrigger) habitMenuTrigger!: MatMenuTrigger;

  constructor() { }

  updateHabitName(value: string) {
    this.habit.emit(value);
  }
  getMenu(): MatMenu {
    return this.menu;
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

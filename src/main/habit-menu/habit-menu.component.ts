import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { MatMenu } from "@angular/material/menu";

@Component({
  selector: 'app-habit-menu',
  templateUrl: './habit-menu.component.html',
  styleUrls: ['./habit-menu.component.scss']
})
export class HabitMenuComponent {

  @Output() habit: EventEmitter<string> = new EventEmitter<string>();
  @ViewChild(MatMenu) menu!: MatMenu;

  updateHabitName(habit: string) {
    this.habit.emit(habit);
  }

  getMenu(): MatMenu {
    return this.menu;
  }
}

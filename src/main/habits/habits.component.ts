import { Component } from '@angular/core';
import { Habit } from "../Data Types/habit";
import { DialogService } from "primeng/dynamicdialog";
import { HabitModalDialogueComponent } from "../habit-modal-dialogue/habit-modal-dialogue.component";


@Component({
  selector: 'app-habits',
  templateUrl: './habits.component.html',
  styleUrls: ['./habits.component.scss']
})
export class HabitsComponent {

  habits: Habit[] = [];

  constructor(private dialogService: DialogService) {
  }

  hasHabits(): boolean {
    return this.habits.length > 0;
  }

  openDialog(): void {
    this.dialogService.open(HabitModalDialogueComponent, {});
  }

}

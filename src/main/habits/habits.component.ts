import { Component } from '@angular/core';
import { Habit } from "../Data Types/habit";

@Component({
  selector: 'app-habits',
  templateUrl: './habits.component.html',
  styleUrls: ['./habits.component.scss']
})
export class HabitsComponent {

  habits: Habit[] = [];

  hasHabits(): boolean {
    return this.habits.length > 0;
  }

}

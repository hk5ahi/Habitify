import { Component, OnDestroy, OnInit } from '@angular/core';
import { HabitService } from "../Service/habit.service";
import { Habit } from "../Data Types/habit";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-all-habits',
  templateUrl: './all-habits.component.html',
  styleUrls: ['./all-habits.component.scss']
})
export class AllHabitsComponent implements OnInit, OnDestroy {

  habits: Habit[] = [];
  private habitsSubscription!: Subscription;

  constructor(private habitService: HabitService) {
  }

  ngOnInit(): void {
    this.habitsSubscription = this.habitService.habitSubject.subscribe((habits: Habit[]) => {
      // Filter habits with isArchived === false
      this.habits = habits.filter(habit => !habit.isArchived);
    });
  }

  ngOnDestroy() {
    if (this.habitsSubscription) {
      this.habitsSubscription.unsubscribe();
    }
  }

}

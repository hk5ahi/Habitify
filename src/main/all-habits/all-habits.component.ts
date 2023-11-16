import { Component, OnDestroy, OnInit } from '@angular/core';
import { HabitService } from "../Service/habit.service";
import { Habit } from "../Data Types/habit";
import { Subscription } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-all-habits',
  templateUrl: './all-habits.component.html',
  styleUrls: ['./all-habits.component.scss']
})
export class AllHabitsComponent implements OnInit, OnDestroy {

  habits: Habit[] = [];
  receivedHabit!: Habit;
  private habitsSubscription!: Subscription;

  constructor(private router: Router, private habitService: HabitService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.habitsSubscription = this.habitService.habitSubject.subscribe((habits: Habit[]) => {
      // Filter habits with isArchived === false
      this.habits = habits.filter(habit => !habit.isArchived);
    });
    this.route.paramMap.subscribe(params => {
      this.receivedHabit = history.state.habit;
    });
    this.router.navigate(['/all-habits']);
  }

  ngOnDestroy() {
    if (this.habitsSubscription) {
      this.habitsSubscription.unsubscribe();
    }
  }

}
